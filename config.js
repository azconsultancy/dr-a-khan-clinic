// Public configuration only. Never put a service-role key or payment secret here.
window.CLINIC_CONFIG = {
  supabaseUrl: '',
  supabaseAnonKey: '',
  whatsappNumber: '918765348423', // Temporary owner number; replace with the clinic WhatsApp number before launch.
  // Optional HTTPS link to a clinic-owned payment provider page; not a payment verification mechanism.
  paymentLink: '',
  // Manual UPI collection. Replace the dummy recipient and set preview to false before accepting money.
  manualUpi: {
    enabled: true,
    preview: true,
    upiId: '',
    payeeName: 'Demo clinic recipient',
    summaryWhatsappNumber: '918765348423'
  }
};
