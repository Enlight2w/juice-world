/**
 * AdminDashboard - Product management page with File Storage integration
 * Allows admin users to create, edit, and delete products with image uploads to S3
 * Design: Tropical Pop Art Explosion
 */
import { useState, useRef } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Loader2, Plus, Trash2, Edit, Upload, X, ArrowLeft, Package } from "lucide-react";
import { toast } from "sonner";

type ProductForm = {
  name: string;
  category: "juices" | "smoothies" | "milkshakes" | "puddings";
  price: number;
  description: string;
  badge: string;
  featured: "yes" | "no";
};

const emptyForm: ProductForm = {
  name: "",
  category: "juices",
  price: 0,
  description: "",
  badge: "",
  featured: "no",
};

export default function AdminDashboard() {
  const { user, loading, isAuthenticated } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const utils = trpc.useUtils();

  // Fetch products from backend
  const { data: products, isLoading } = trpc.products.list.useQuery();
  const { data: orders } = trpc.orders.list.useQuery(undefined, {
    enabled: user?.role === "admin",
  });

  // Mutations
  const createMutation = trpc.products.create.useMutation({
    onSuccess: () => {
      toast.success("Product created successfully!");
      utils.products.list.invalidate();
      resetForm();
    },
    onError: (err) => toast.error(err.message),
  });

  const updateMutation = trpc.products.update.useMutation({
    onSuccess: () => {
      toast.success("Product updated successfully!");
      utils.products.list.invalidate();
      resetForm();
    },
    onError: (err) => toast.error(err.message),
  });

  const deleteMutation = trpc.products.delete.useMutation({
    onSuccess: () => {
      toast.success("Product deleted!");
      utils.products.list.invalidate();
    },
    onError: (err) => toast.error(err.message),
  });

  const orderStatusMutation = trpc.orders.updateStatus.useMutation({
    onSuccess: () => {
      toast.success("Order status updated!");
      utils.orders.list.invalidate();
    },
    onError: (err) => toast.error(err.message),
  });

  function resetForm() {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
    setImageFile(null);
    setImagePreview("");
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const handleImage = (callback: (base64: string) => void) => {
      if (!imageFile) {
        callback("");
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        const base64 = (ev.target?.result as string).split(",")[1];
        callback(base64);
      };
      reader.readAsDataURL(imageFile);
    };

    if (editingId !== null) {
      handleImage((base64) => {
        updateMutation.mutate({
          id: editingId,
          ...form,
          imageBase64: base64 || undefined,
          imageFileName: imageFile?.name || undefined,
        });
      });
    } else {
      handleImage((base64) => {
        createMutation.mutate({
          ...form,
          imageBase64: base64 || undefined,
          imageFileName: imageFile?.name || undefined,
        });
      });
    }
  }

  function startEdit(product: NonNullable<typeof products>[0]) {
    setForm({
      name: product.name,
      category: product.category,
      price: parseFloat(product.price as any),
      description: product.description || "",
      badge: product.badge || "",
      featured: product.featured,
    });
    setEditingId(product.id);
    setImagePreview(product.imageUrl || "");
    setShowForm(true);
  }

  function deleteProduct(id: number) {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteMutation.mutate({ id });
    }
  }

  // Show loading while auth check
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#FF6B35]" />
      </div>
    );
  }

  // Redirect non-authenticated users
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FFF8F0] flex flex-col items-center justify-center gap-4">
        <p className="text-[#1A1A2E] text-lg">Please sign in to access the admin panel.</p>
        <a href="/" className="flex items-center gap-2 text-[#FF6B35] hover:underline">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </a>
      </div>
    );
  }

  // Redirect non-admin users
  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-[#FFF8F0] flex flex-col items-center justify-center gap-4">
        <p className="text-[#1A1A2E] text-lg">You need admin access to view this page.</p>
        <a href="/" className="flex items-center gap-2 text-[#FF6B35] hover:underline">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-50">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-2 text-[#FF6B35] hover:underline">
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium">Back to Site</span>
            </a>
          </div>
          <h1 className="font-display text-xl text-[#1A1A2E]">Admin Dashboard</h1>
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-[#FF6B35]" />
            <span className="text-sm text-[#1A1A2E]/60">Welcome, {user?.name}</span>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Products Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl text-[#1A1A2E]">
              Products ({products?.length || 0})
            </h2>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 bg-gradient-to-r from-[#FF6B35] to-[#FF2D87] text-white px-5 py-2.5 rounded-full font-medium hover:scale-105 active:scale-95 transition-transform duration-200 shadow-lg"
            >
              {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {showForm ? "Cancel" : "Add Product"}
            </button>
          </div>

          {/* Product Form */}
          {showForm && (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-orange-50">
              <h3 className="font-display text-lg text-[#1A1A2E] mb-4">
                {editingId ? "Edit Product" : "New Product"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-orange-100 focus:border-[#FF6B35] focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Category *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-orange-100 focus:border-[#FF6B35] focus:outline-none transition-colors"
                  >
                    <option value="juices">🍊 Juices</option>
                    <option value="smoothies">🥤 Smoothies</option>
                    <option value="milkshakes">🥛 Milkshakes</option>
                    <option value="puddings">🍮 Puddings</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Price *</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-orange-100 focus:border-[#FF6B35] focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Badge</label>
                  <input
                    type="text"
                    value={form.badge}
                    onChange={(e) => setForm({ ...form, badge: e.target.value })}
                    placeholder="e.g. Bestseller, New, Premium"
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-orange-100 focus:border-[#FF6B35] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Featured</label>
                  <select
                    value={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.value as any })}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-orange-100 focus:border-[#FF6B35] focus:outline-none transition-colors"
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-orange-100 focus:border-[#FF6B35] focus:outline-none transition-colors resize-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#1A1A2E] mb-1.5">Product Image (uploaded to S3)</label>
                  <div className="flex items-center gap-4">
                    {imagePreview && (
                      <img src={imagePreview} alt="Preview" className="w-20 h-20 rounded-xl object-cover border-2 border-orange-100" />
                    )}
                    <div className="flex-1">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-[#FF6B35]/30 text-[#FF6B35] hover:border-[#FF6B35]/60 hover:bg-[#FF6B35]/5 transition-colors"
                      >
                        <Upload className="w-4 h-4" />
                        {imageFile ? imageFile.name : "Choose Image"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
                className="mt-6 w-full md:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#FF2D87] text-white font-medium hover:scale-105 active:scale-95 transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {(createMutation.isPending || updateMutation.isPending) && <Loader2 className="w-4 h-4 animate-spin" />}
                {editingId ? "Update Product" : "Create Product"}
              </button>
            </form>
          )}

          {/* Products Table */}
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-[#FF6B35]" />
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-md border border-orange-50 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#FFF8F0] border-b border-orange-50">
                    <th className="px-4 py-3 text-left text-sm font-medium text-[#1A1A2E]/60">Product</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-[#1A1A2E]/60">Category</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-[#1A1A2E]/60">Price</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-[#1A1A2E]/60">Featured</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-[#1A1A2E]/60">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products?.map((product) => (
                    <tr key={product.id} className="border-b border-orange-50/50 hover:bg-[#FFF8F0]/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {product.imageUrl && (
                            <img src={product.imageUrl} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                          )}
                          <div>
                            <p className="font-medium text-[#1A1A2E]">{product.name}</p>
                            {product.badge && (
                              <span className="text-xs px-2 py-0.5 rounded-full bg-[#FF6B35]/10 text-[#FF6B35]">{product.badge}</span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-[#1A1A2E]/60 capitalize">{product.category}</td>
                      <td className="px-4 py-3 text-sm font-medium text-[#FF6B35]">${product.price.toFixed(2)}</td>
                      <td className="px-4 py-3 text-sm">{product.featured === "yes" ? "⭐" : "—"}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => startEdit(product)}
                            className="p-2 rounded-lg text-[#FF6B35] hover:bg-[#FF6B35]/10 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteProduct(product.id)}
                            className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Orders Section */}
        {orders && orders.length > 0 && (
          <div>
            <h2 className="font-display text-2xl text-[#1A1A2E] mb-6">
              Orders ({orders.length})
            </h2>
            <div className="bg-white rounded-2xl shadow-md border border-orange-50 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#FFF8F0] border-b border-orange-50">
                    <th className="px-4 py-3 text-left text-sm font-medium text-[#1A1A2E]/60">Customer</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-[#1A1A2E]/60">Items</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-[#1A1A2E]/60">Total</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-[#1A1A2E]/60">Status</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-[#1A1A2E]/60">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order: any) => (
                    <tr key={order.id} className="border-b border-orange-50/50 hover:bg-[#FFF8F0]/50 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-medium text-[#1A1A2E]">{order.customerName}</p>
                        {order.customerEmail && <p className="text-xs text-[#1A1A2E]/40">{order.customerEmail}</p>}
                      </td>
                      <td className="px-4 py-3 text-sm text-[#1A1A2E]/60">
                        {order.items.map((item: any) => (
                          <span key={item.productId} className="block">
                            {item.quantity}x {item.name} (${item.price.toFixed(2)})
                          </span>
                        ))}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-[#FF6B35]">${order.totalAmount.toFixed(2)}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          order.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                          order.status === "confirmed" ? "bg-blue-100 text-blue-700" :
                          order.status === "ready" ? "bg-green-100 text-green-700" :
                          order.status === "completed" ? "bg-gray-100 text-gray-700" :
                          "bg-red-100 text-red-700"
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <select
                          value={order.status}
                          onChange={(e) => orderStatusMutation.mutate({ id: order.id, status: e.target.value as any })}
                          className="px-2 py-1.5 rounded-lg border border-orange-100 text-sm focus:outline-none focus:border-[#FF6B35]"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="ready">Ready</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
