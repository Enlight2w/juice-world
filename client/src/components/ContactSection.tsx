/**
 * ContactSection - Contact info with pop-art styling and playful voice
 * Diagonal color blocks, splash decorations, comic-style badges
 * Design: Tropical Pop Art Explosion
 */
import { useState } from "react";
import { MapPin, Mail, Phone, Clock, Send } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-16 md:py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFF8F0] via-white to-[#FFF8F0]" />

      {/* Diagonal pop-art accent */}
      <div
        className="absolute bottom-0 left-0 w-[40%] h-1/2 opacity-[0.04]"
        style={{
          background: `linear-gradient(45deg, #FF2D87, transparent)`,
          clipPath: "polygon(0 100%, 100% 100%, 0 0)",
        }}
      />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-handwritten text-[#FF2D87] text-xl md:text-2xl block mb-2">
            Get In Touch
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-[#1A1A2E] mb-4">
            Find Us Here
          </h2>
          <p className="text-[#1A1A2E]/55 max-w-md mx-auto">
            We'd love to hear from you! Stop by, call us, or send a message.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-5">
            {/* Location */}
            <div className="group relative flex items-start gap-5 p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-gray-50">
              {/* Hover accent */}
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#FF6B35] to-[#FF2D87] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-l-2xl" />
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF6B35] to-[#FF2D87] flex items-center justify-center shadow-lg shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-display text-lg text-[#1A1A2E] mb-1">Our Location</h4>
                <p className="text-[#1A1A2E]/55 text-sm">
                  123 Fruit Lane, Sunnyville District<br />
                  Tropical Town, FL 33101
                </p>
                <span className="inline-block mt-2 text-xs px-3 py-1 rounded-full bg-[#FF6B35]/10 text-[#FF6B35] font-medium">
                  📍 Anonymous Pickup Point
                </span>
              </div>
            </div>

            {/* Email */}
            <div className="group relative flex items-start gap-5 p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-gray-50">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#7AC74F] to-[#FFD23F] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-l-2xl" />
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7AC74F] to-[#FFD23F] flex items-center justify-center shadow-lg shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-display text-lg text-[#1A1A2E] mb-1">Email Us</h4>
                <p className="text-[#FF6B35] font-semibold text-sm">hello@juiceworld.com</p>
                <p className="text-[#1A1A2E]/45 text-xs mt-1">
                  We respond within 24 hours — usually faster!
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="group relative flex items-start gap-5 p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-gray-50">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#8B5CF6] to-[#FF2D87] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-l-2xl" />
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#FF2D87] flex items-center justify-center shadow-lg shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-display text-lg text-[#1A1A2E] mb-1">Call Us</h4>
                <p className="text-[#FF6B35] font-semibold text-sm">+1 (555) 123-4567</p>
                <p className="text-[#1A1A2E]/45 text-xs mt-1">
                  Mon-Sat: 8AM - 9PM | Sun: 10AM - 8PM
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="group relative flex items-start gap-5 p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-gray-50">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#FFD23F] to-[#FF6B35] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-l-2xl" />
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FFD23F] to-[#FF6B35] flex items-center justify-center shadow-lg shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-display text-lg text-[#1A1A2E] mb-1">Opening Hours</h4>
                <div className="text-sm text-[#1A1A2E]/55 space-y-1">
                  <p>Monday - Friday: <span className="font-medium">8:00 AM - 9:00 PM</span></p>
                  <p>Saturday: <span className="font-medium">9:00 AM - 10:00 PM</span></p>
                  <p>Sunday: <span className="font-medium">10:00 AM - 8:00 PM</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="relative">
            {/* Splash decoration behind form */}
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-[#FF6B35]/5 blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-[#FF2D87]/5 blur-xl" />

            <div className="relative bg-white rounded-3xl shadow-xl p-8 border border-gray-50 overflow-hidden">
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FF6B35] to-[#FF2D87]" />

              <h3 className="font-display text-2xl text-[#1A1A2E] mb-2">
                Send Us a Message
              </h3>
              <p className="text-[#1A1A2E]/45 text-sm mb-6">
                Got a question or craving? Drop us a line! 💌
              </p>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <span className="text-6xl mb-4 animate-bounce">🎉</span>
                  <h4 className="font-display text-xl text-[#1A1A2E] mb-2">
                    Message Sent!
                  </h4>
                  <p className="text-[#1A1A2E]/55">
                    We'll get back to you soon. Stay juicy!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-[#1A1A2E] mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-[#FF6B35]/10 focus:border-[#FF6B35] focus:outline-none transition-all duration-200 bg-[#FFF8F0]/30 text-[#1A1A2E] placeholder:text-[#1A1A2E]/30"
                      placeholder="What should we call you?"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1A1A2E] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-[#FF6B35]/10 focus:border-[#FF6B35] focus:outline-none transition-all duration-200 bg-[#FFF8F0]/30 text-[#1A1A2E] placeholder:text-[#1A1A2E]/30"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1A1A2E] mb-2">
                      Message
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-[#FF6B35]/10 focus:border-[#FF6B35] focus:outline-none transition-all duration-200 bg-[#FFF8F0]/30 text-[#1A1A2E] placeholder:text-[#1A1A2E]/30 resize-none"
                      placeholder="Tell us what's on your mind..."
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF6B35] to-[#FF2D87] text-white py-4 rounded-xl font-display text-lg shadow-lg shadow-orange-200/40 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
