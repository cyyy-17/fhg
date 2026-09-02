"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Send, AlertCircle, Clock } from "lucide-react";
import { companyData } from "@/data/company";

export default function ContactSection() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = "Please enter your full name.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!phone.trim()) newErrors.phone = "Please enter your phone number.";
    if (!subject.trim()) newErrors.subject = "Please enter project subject or location.";
    if (!message.trim()) newErrors.message = "Please enter project details.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);

    const emailSubject = encodeURIComponent(`[Website Inquiry] ${subject}`);
    const emailBody = encodeURIComponent(
      `Name: ${fullName}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone}\n\n` +
      `Message:\n${message}`
    );

    window.location.href = `mailto:edluna1971@yahoo.com?cc=iamfeluna@yahoo.com&subject=${emailSubject}&body=${emailBody}`;
  };

  return (
    <section id="contact" className="py-24 bg-[#050e07] relative z-20">
      <div className="w-full max-w-[1720px] mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#76c442] bg-[#4caf50]/10 border border-[#4caf50]/20 mb-4">
            Operations & Inquiries Desk
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight leading-tight">
            Initiate Project Coordination
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#a8d5a8]">
            Direct lines to senior arboricultural project managers and administrative compliance officers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Touchpoint Cards */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <a
              href="tel:0437410603"
              className="glass-panel glass-panel-hover rounded-2xl p-6 flex items-center gap-5 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#2e7d32]/20 border border-[#4caf50]/30 flex items-center justify-center text-[#76c442] group-hover:scale-110 group-hover:bg-[#2e7d32] group-hover:text-white transition-all">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#ffd600] uppercase tracking-wider block">
                  Telefax / Landline Desk
                </span>
                <span className="text-base font-bold text-white group-hover:text-[#ffd600] transition-colors">
                  {companyData.headOffice.telefax}
                </span>
              </div>
            </a>

            <a
              href="tel:09165667265"
              className="glass-panel glass-panel-hover rounded-2xl p-6 flex items-center gap-5 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#2e7d32]/20 border border-[#4caf50]/30 flex items-center justify-center text-[#76c442] group-hover:scale-110 group-hover:bg-[#2e7d32] group-hover:text-white transition-all">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#ffd600] uppercase tracking-wider block">
                  Mobile Operations Dispatch
                </span>
                <span className="text-base font-bold text-white group-hover:text-[#ffd600] transition-colors">
                  {companyData.headOffice.mobiles.join(" • ")}
                </span>
              </div>
            </a>

            <a
              href="mailto:edluna1971@yahoo.com?cc=iamfeluna@yahoo.com"
              className="glass-panel glass-panel-hover rounded-2xl p-6 flex items-center gap-5 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#2e7d32]/20 border border-[#4caf50]/30 flex items-center justify-center text-[#76c442] group-hover:scale-110 group-hover:bg-[#2e7d32] group-hover:text-white transition-all">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#ffd600] uppercase tracking-wider block">
                  Executive Email
                </span>
                <span className="text-sm font-bold text-white group-hover:text-[#ffd600] transition-colors">
                  {companyData.headOffice.emails.join(" / ")}
                </span>
              </div>
            </a>

            <div className="glass-panel rounded-2xl p-6 flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-[#2e7d32]/20 border border-[#4caf50]/30 flex items-center justify-center text-[#76c442]">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#ffd600] uppercase tracking-wider block">
                  Head Office Location
                </span>
                <span className="text-xs sm:text-sm font-bold text-white">
                  {companyData.headOffice.address}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3 text-xs text-[#a8d5a8]">
              <Clock className="w-4 h-4 text-[#ffd600] shrink-0" />
              <span>Operations Active: Monday to Saturday, 8:00 AM – 5:00 PM PHT</span>
            </div>
          </div>

          {/* Right Direct Inquiry Form */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-8 sm:p-12 border border-[#4caf50]/30 shadow-2xl">
            <h3 className="text-2xl font-bold font-heading text-white mb-2">
              Send Us a Direct Message
            </h3>
            <p className="text-sm text-[#a8d5a8] mb-8">
              We reply promptly during active operations hours with verified project feasibility advice.
            </p>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-[#a8d5a8] uppercase tracking-wider mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors({ ...errors, fullName: "" });
                    }}
                    placeholder="e.g. Engr. Juan Dela Cruz"
                    className={`w-full px-4 py-3 rounded-xl form-input text-sm ${
                      errors.fullName ? "form-input-error" : ""
                    }`}
                  />
                  {errors.fullName && (
                    <span className="flex items-center gap-1 text-xs text-red-400 mt-1.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.fullName}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#a8d5a8] uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: "" });
                    }}
                    placeholder="name@company.com"
                    className={`w-full px-4 py-3 rounded-xl form-input text-sm ${
                      errors.email ? "form-input-error" : ""
                    }`}
                  />
                  {errors.email && (
                    <span className="flex items-center gap-1 text-xs text-red-400 mt-1.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-[#a8d5a8] uppercase tracking-wider mb-2">
                    Contact Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors({ ...errors, phone: "" });
                    }}
                    placeholder="0917 XXX XXXX"
                    className={`w-full px-4 py-3 rounded-xl form-input text-sm ${
                      errors.phone ? "form-input-error" : ""
                    }`}
                  />
                  {errors.phone && (
                    <span className="flex items-center gap-1 text-xs text-red-400 mt-1.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.phone}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#a8d5a8] uppercase tracking-wider mb-2">
                    Project Subject / Scope
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => {
                      setSubject(e.target.value);
                      if (errors.subject) setErrors({ ...errors, subject: "" });
                    }}
                    placeholder="e.g. SLEX TR4 Tree Cutting Tender"
                    className={`w-full px-4 py-3 rounded-xl form-input text-sm ${
                      errors.subject ? "form-input-error" : ""
                    }`}
                  />
                  {errors.subject && (
                    <span className="flex items-center gap-1 text-xs text-red-400 mt-1.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.subject}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#a8d5a8] uppercase tracking-wider mb-2">
                  Project Details & Requirements
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors({ ...errors, message: "" });
                  }}
                  placeholder="Describe project location, estimated tree count, target start date, and any DENR permitting status..."
                  className={`w-full px-4 py-3 rounded-xl form-input text-sm resize-none ${
                    errors.message ? "form-input-error" : ""
                  }`}
                />
                {errors.message && (
                  <span className="flex items-center gap-1 text-xs text-red-400 mt-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl font-extrabold text-sm uppercase tracking-wider bg-linear-to-r from-[#2e7d32] to-[#1a5c1a] text-white hover:brightness-110 shadow-xl border border-[#4caf50]/40 flex items-center justify-center gap-2 hover:scale-[1.01] transition-all duration-200 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send Direct Inquiry</span>
              </button>

              {submitted && (
                <div className="p-4 rounded-xl bg-[#4caf50]/20 border border-[#76c442]/40 text-center text-xs text-[#f0fbf0]">
                  Message drafted! Email client opened for submission to our operations desk.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
