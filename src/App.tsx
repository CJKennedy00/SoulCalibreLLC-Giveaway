import { useState, FormEvent } from 'react';

// Define the available products/services for the giveaway
const PRODUCTS = [
  'Canva Pro (Canva For Education Student Access)',
  'Microsoft Office 365 E5 Developer',
  'Autodesk',
  'JetBrains'
];

function App() {
  // Form state
  const [email, setEmail] = useState('');
  const [phCornerName, setPhCornerName] = useState('');
  const [product, setProduct] = useState('');
  const [reason, setReason] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Form submission handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!email.trim()) {
      setFormError('Please enter your email address');
      return;
    }

    if (!phCornerName.trim()) {
      setFormError('Please enter your PHCorner name');
      return;
    }

    if (!product) {
      setFormError('Please select a product/service');
      return;
    }

    if (!reason.trim()) {
      setFormError('Please provide a reason for why you should win');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormError('Please enter a valid email address');
      return;
    }

    // Clear errors and show loading state
    setFormError('');
    setIsLoading(true);

    try {
      // Simulate form submission delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // In a real app, you would send this data to your backend
      console.log({ email, phCornerName, product, reason });

      // Show success state
      setSubmitted(true);
    } catch (error) {
      setFormError('Something went wrong. Please try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{
      backgroundImage: `url('/beach-sunset.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <div className="flex-1 flex flex-col items-center p-4 md:p-8">
        {/* Title */}
        <h1
          className="text-4xl md:text-6xl font-bold text-white text-center my-8 md:my-12 drop-shadow-lg"
          style={{ fontFamily: 'Ink Free, cursive' }}
        >
          Soul Calibre LLC Giveaway
        </h1>

        {/* Form Card */}
        <div className="w-full max-w-xl bg-white/90 backdrop-blur-sm rounded-lg shadow-2xl p-6 md:p-8">
          {submitted ? (
            <div className="text-center py-10">
              <h2 className="text-3xl font-bold text-green-600 mb-4">Thank You!</h2>
              <p className="text-lg mb-6">Your entry has been received. We'll be in touch soon!</p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setEmail('');
                  setPhCornerName('');
                  setProduct('');
                  setReason('');
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Submit Another Entry
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Enter the Giveaway</h2>
              <p className="text-gray-600 mb-6">Fill out the form below for a chance to win one of our premium products/services.</p>

              {/* Error message */}
              {formError && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {formError}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Email Field */}
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Active Email Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  <p className="mt-1 text-sm text-gray-500">We'll never share your email with anyone else.</p>
                </div>

                {/* PHCorner Name Field */}
                <div className="mb-4">
                  <label htmlFor="phCornerName" className="block text-gray-700 font-medium mb-2">
                    PHCorner Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="phCornerName"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your PHCorner Username"
                    value={phCornerName}
                    onChange={(e) => setPhCornerName(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>

                {/* Product Selection */}
                <div className="mb-4">
                  <label htmlFor="product" className="block text-gray-700 font-medium mb-2">
                    Chosen Product/Service <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="product"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    required
                    disabled={isLoading}
                  >
                    <option value="">Select a product/service</option>
                    {PRODUCTS.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Reason Field */}
                <div className="mb-6">
                  <label htmlFor="reason" className="block text-gray-700 font-medium mb-2">
                    Reason <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    id="reason"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tell us why you should win this product/service..."
                    rows={4}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  <p className="mt-1 text-sm text-gray-500">Be creative and honest with your reason for a better chance to win!</p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className={`w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : 'Submit Entry'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/70 backdrop-blur-sm text-white text-center p-4 mt-8">
        <p>© Soul Calibre LLC. All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default App;
