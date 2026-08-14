import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock db module
vi.mock("./db", () => ({
  getAllProducts: vi.fn(),
  getProductById: vi.fn(),
  createProduct: vi.fn(),
  updateProduct: vi.fn(),
  deleteProduct: vi.fn(),
  createOrder: vi.fn(),
  getAllOrders: vi.fn(),
  updateOrderStatus: vi.fn(),
}));

// Mock storage module
vi.mock("./storage", () => ({
  storagePut: vi.fn(),
  storageGet: vi.fn(),
}));

import { getAllProducts, getProductById, createProduct, createOrder, getAllOrders } from "./db";
import { storagePut } from "./storage";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

function createAdminContext(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "admin-user",
      email: "admin@example.com",
      name: "Admin",
      loginMethod: "manus",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: () => {} } as TrpcContext["res"],
  };
}

function createUserContext(): TrpcContext {
  return {
    user: {
      id: 2,
      openId: "regular-user",
      email: "user@example.com",
      name: "Regular User",
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: () => {} } as TrpcContext["res"],
  };
}

describe("products.list", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns all products for public access", async () => {
    const mockProducts = [
      { id: 1, name: "Orange Juice", category: "juices", price: "4.99", description: "Fresh", badge: null, imageKey: null, imageUrl: "/manus-storage/test.png", featured: "no" as const, badge2: null, createdAt: new Date(), updatedAt: new Date() },
    ];
    vi.mocked(getAllProducts).mockResolvedValue(mockProducts as any);

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.products.list();

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Orange Juice");
    expect(result[0].price).toBe(4.99);
  });

  it("returns empty array when no products exist", async () => {
    vi.mocked(getAllProducts).mockResolvedValue([]);

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.products.list();

    expect(result).toHaveLength(0);
  });
});

describe("products.getById", () => {
  it("throws NOT_FOUND for non-existent product", async () => {
    vi.mocked(getProductById).mockResolvedValue(undefined);

    const caller = appRouter.createCaller(createPublicContext());
    await expect(caller.products.getById({ id: 999 })).rejects.toThrow();
  });
});

describe("products.create", () => {
  it("allows admin to create a product", async () => {
    vi.mocked(createProduct).mockResolvedValue(undefined as any);

    const caller = appRouter.createCaller(createAdminContext());
    const result = await caller.products.create({
      name: "Test Juice",
      category: "juices",
      price: 5.99,
      description: "Test description",
      featured: "no",
    });

    expect(result.success).toBe(true);
    expect(createProduct).toHaveBeenCalled();
  });

  it("allows admin to create a product with image upload", async () => {
    vi.mocked(createProduct).mockResolvedValue(undefined as any);
    vi.mocked(storagePut).mockResolvedValue({ key: "products/test.png", url: "/manus-storage/products/test.png" });

    const caller = appRouter.createCaller(createAdminContext());
    const result = await caller.products.create({
      name: "Juicy Product",
      category: "smoothies",
      price: 6.99,
      description: "With image",
      featured: "yes",
      imageBase64: Buffer.from("fake-image-data").toString("base64"),
      imageFileName: "test.png",
    });

    expect(result.success).toBe(true);
    expect(storagePut).toHaveBeenCalled();
    expect(createProduct).toHaveBeenCalledWith(
      expect.objectContaining({
        imageUrl: "/manus-storage/products/test.png",
        imageKey: "products/test.png",
      })
    );
  });

  it("rejects non-admin users from creating products", async () => {
    const caller = appRouter.createCaller(createUserContext());
    await expect(
      caller.products.create({
        name: "Hacked Juice",
        category: "juices",
        price: 1.00,
        featured: "no",
      })
    ).rejects.toThrow();
  });

  it("rejects non-admin users from updating products", async () => {
    const caller = appRouter.createCaller(createUserContext());
    await expect(
      caller.products.update({
        id: 1,
        name: "Hacked Name",
      })
    ).rejects.toThrow();
  });

  it("rejects non-admin users from deleting products", async () => {
    const caller = appRouter.createCaller(createUserContext());
    await expect(
      caller.products.delete({ id: 1 })
    ).rejects.toThrow();
  });

  it("allows admin to update a product", async () => {
    vi.mocked(createProduct).mockResolvedValue(undefined as any);
    const caller = appRouter.createCaller(createAdminContext());
    const result = await caller.products.update({
      id: 1,
      name: "Updated Juice",
      price: 7.99,
    });
    expect(result.success).toBe(true);
  });

  it("allows admin to delete a product", async () => {
    const { deleteProduct } = await import("./db");
    vi.mocked(deleteProduct).mockResolvedValue(undefined as any);
    const caller = appRouter.createCaller(createAdminContext());
    const result = await caller.products.delete({ id: 1 });
    expect(result.success).toBe(true);
    expect(deleteProduct).toHaveBeenCalledWith(1);
  });

  it("throws error when storage upload fails", async () => {
    vi.mocked(storagePut).mockRejectedValue(new Error("Storage presign failed (500): Internal Server Error"));
    const caller = appRouter.createCaller(createAdminContext());
    await expect(
      caller.products.create({
        name: "Juicy Product",
        category: "smoothies",
        price: 6.99,
        featured: "no",
        imageBase64: Buffer.from("fake-image-data").toString("base64"),
        imageFileName: "test.png",
      })
    ).rejects.toThrow(/Storage presign failed/);
  });

  it("rejects unauthenticated users", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.products.create({
        name: "Anonymous Juice",
        category: "juices",
        price: 1.00,
        featured: "no",
      })
    ).rejects.toThrow();
  });
});

describe("orders.create", () => {
  it("allows public users to place orders", async () => {
    vi.mocked(createOrder).mockResolvedValue(undefined as any);

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.orders.create({
      customerName: "John Doe",
      customerEmail: "john@example.com",
      items: [
        { productId: 1, name: "Orange Juice", price: 4.99, quantity: 2 },
        { productId: 5, name: "Mango Smoothie", price: 6.99, quantity: 1 },
      ],
      notes: "Extra ice please",
    });

    expect(result.success).toBe(true);
    expect(result.totalAmount).toBe(16.97);
    expect(createOrder).toHaveBeenCalledWith(
      expect.objectContaining({
        customerName: "John Doe",
        totalAmount: "16.97",
        status: "pending",
      })
    );
  });

  it("calculates total correctly with multiple items", async () => {
    vi.mocked(createOrder).mockResolvedValue(undefined as any);

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.orders.create({
      customerName: "Jane Doe",
      items: [
        { productId: 1, name: "Item A", price: 10.00, quantity: 3 },
        { productId: 2, name: "Item B", price: 5.50, quantity: 2 },
      ],
    });

    expect(result.totalAmount).toBe(41.00);
  });

  it("rejects orders with empty items", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.orders.create({
        customerName: "Test",
        items: [],
      })
    ).rejects.toThrow();
  });
});

describe("orders.list", () => {
  it("allows admin to list orders", async () => {
    const mockOrders = [
      { id: 1, customerName: "John", customerEmail: null, customerPhone: null, items: '[]', totalAmount: "10.00", status: "pending" as const, notes: null, createdAt: new Date(), updatedAt: new Date() },
    ];
    vi.mocked(getAllOrders).mockResolvedValue(mockOrders as any);

    const caller = appRouter.createCaller(createAdminContext());
    const result = await caller.orders.list();

    expect(result).toHaveLength(1);
  });

  it("rejects non-admin users from listing orders", async () => {
    const caller = appRouter.createCaller(createUserContext());
    await expect(caller.orders.list()).rejects.toThrow();
  });
});
