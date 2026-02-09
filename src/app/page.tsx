'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, ClockIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { subscribeToNewsletter } from '@/lib/convertkit';
import Image from 'next/image';

export default function Home() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await subscribeToNewsletter(email);

      if (result.success) {
        setIsSubmitted(true);
      } else {
        setError(result.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Navigation */}
      <nav className="absolute w-full z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            className="text-2xl font-bold text-amber-900"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            FretScout
          </motion.div>
          <motion.div
            className="text-sm text-amber-700 hidden sm:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Coming Soon
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 pt-20 pb-16 lg:pt-32 lg:pb-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.div
                className="inline-block px-4 py-2 bg-amber-100 text-amber-800 text-sm font-medium rounded-full"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                🎸 For Guitar Enthusiasts
              </motion.div>

              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Tired of checking{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                  6 different sites
                </span>{' '}
                to find one used guitar?
              </h1>

              <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
                Search all guitar marketplaces at once. Get deal alerts for vintage gems.
                Never miss your dream guitar again.
              </p>
            </div>

            {/* Email Capture Form */}
            {!isSubmitted ? (
              <motion.form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-4 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-colors text-gray-900 placeholder-gray-500"
                />
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: isLoading ? 1 : 1.05 }}
                  whileTap={{ scale: isLoading ? 1 : 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Signing up...' : 'Get Early Access'}
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                className="flex items-center gap-3 text-green-700 bg-green-50 px-6 py-4 rounded-lg border border-green-200 max-w-md mx-auto"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <CheckCircleIcon className="w-6 h-6" />
                <span className="font-medium">You&apos;re on the list! We&apos;ll notify you when FretScout launches.</span>
              </motion.div>
            )}

            {error && (
              <motion.div
                className="text-red-600 text-sm bg-red-50 px-4 py-2 rounded-lg border border-red-200 max-w-md mx-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {error}
              </motion.div>
            )}

            <motion.p
              className="text-sm text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Join 500+ guitarists already waiting. No spam, just great guitar deals.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Simple Demo Section */}
      <section className="px-6 py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Here's what you'll find
              </h2>
              <p className="text-lg text-gray-600">
                Real deals from real marketplaces, scored instantly
              </p>
            </div>

            {/* Simple Guitar Card */}
            <motion.div
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 max-w-sm mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="aspect-[4/3] relative rounded-lg overflow-hidden mb-4 bg-gray-100">
                <Image
                  src="/vintage-strat.jpg"
                  alt="1965 Fender Stratocaster"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                  GREAT DEAL
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h3 className="font-bold text-gray-900">1965 Fender Stratocaster</h3>
                  <p className="text-sm text-gray-600">Reverb.com</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-green-600">$3,200</span>
                  <span className="text-sm text-gray-500">$800 below market</span>
                </div>
              </div>
            </motion.div>

            <motion.p
              className="text-gray-600"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Searched 6 marketplaces • Found in 0.3 seconds
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.h2
            className="text-4xl font-bold text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Sound familiar?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl">😤</div>
              <h3 className="text-xl font-semibold text-gray-900">Checking 6+ sites daily</h3>
              <p className="text-gray-600">Reverb, Guitar Center, Facebook, Craigslist, eBay, local shops...</p>
            </motion.div>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl">💸</div>
              <h3 className="text-xl font-semibold text-gray-900">Missing great deals</h3>
              <p className="text-gray-600">That perfect vintage guitar sold while you were sleeping</p>
            </motion.div>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl">🤔</div>
              <h3 className="text-xl font-semibold text-gray-900">Guessing on prices</h3>
              <p className="text-gray-600">Is $2,400 good for a '78 Les Paul? Hard to tell without research</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solution Preview */}
      <section className="px-6 py-16 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="max-w-4xl mx-auto space-y-12">
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900">
              One search. All marketplaces. Smart alerts.
            </h2>
            <p className="text-xl text-gray-700">
              FretScout does the hunting for you
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="bg-white p-6 rounded-xl shadow-lg space-y-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                <MagnifyingGlassIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Unified Search</h3>
              <p className="text-gray-600">Search Reverb, Guitar Center, Facebook, and more from one place</p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-xl shadow-lg space-y-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <CheckCircleIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Deal Intelligence</h3>
              <p className="text-gray-600">Know if you&apos;re getting a good deal before you buy</p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-xl shadow-lg space-y-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                <ClockIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Smart Alerts</h3>
              <p className="text-gray-600">Get notified the moment your dream guitar appears</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-16 bg-gray-900 text-white">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <motion.h2
            className="text-4xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Don&apos;t let another dream guitar slip away
          </motion.h2>

          <motion.p
            className="text-xl text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Be the first to know when FretScout launches
          </motion.p>

          {!isSubmitted && (
            <motion.form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-colors"
              />
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: isLoading ? 1 : 1.05 }}
                whileTap={{ scale: isLoading ? 1 : 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing up...' : 'Get Early Access'}
              </motion.button>
            </motion.form>
          )}

          <motion.p
            className="text-sm text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Join the waitlist • No spam • Unsubscribe anytime
          </motion.p>
        </div>
      </section>
    </div>
  );
}