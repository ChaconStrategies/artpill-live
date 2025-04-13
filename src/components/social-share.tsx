'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Twitter, Facebook, Linkedin, Link, Check } from 'lucide-react';
import { useTheme } from '@/lib/theme-context';

interface SocialShareProps {
  url: string;
  title: string;
  summary?: string;
  className?: string;
}

export default function SocialShare({
  url,
  title,
  summary = '',
  className = ''
}: SocialShareProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { colorScheme } = useTheme();
  const isDark = colorScheme === 'dark';

  // Get absolute URL
  const getShareUrl = () => {
    if (typeof window === 'undefined') return url;
    return new URL(url, window.location.origin).toString();
  };

  const shareUrl = getShareUrl();
  const encodedTitle = encodeURIComponent(title);
  const encodedSummary = encodeURIComponent(summary);
  const encodedUrl = encodeURIComponent(shareUrl);

  const shareData = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedSummary}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const iconColor = isDark ? 'white' : 'black';
  const backgroundColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
  const primaryColor = '#dcfb44';

  return (
    <div className={`relative inline-block ${className}`}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-primary/10"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Share this article"
      >
        <Share2 size={20} color={isOpen ? primaryColor : iconColor} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 z-50 flex space-x-1 p-2 rounded-lg shadow-lg"
            style={{ backgroundColor }}
          >
            <motion.a
              href={shareData.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-primary/20"
              whileHover={{ scale: 1.1, backgroundColor: primaryColor }}
              whileTap={{ scale: 0.9 }}
              aria-label="Share on Twitter"
            >
              <Twitter size={20} color={iconColor} />
            </motion.a>

            <motion.a
              href={shareData.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-primary/20"
              whileHover={{ scale: 1.1, backgroundColor: primaryColor }}
              whileTap={{ scale: 0.9 }}
              aria-label="Share on Facebook"
            >
              <Facebook size={20} color={iconColor} />
            </motion.a>

            <motion.a
              href={shareData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-primary/20"
              whileHover={{ scale: 1.1, backgroundColor: primaryColor }}
              whileTap={{ scale: 0.9 }}
              aria-label="Share on LinkedIn"
            >
              <Linkedin size={20} color={iconColor} />
            </motion.a>

            <motion.button
              onClick={handleCopyLink}
              className="p-2 rounded-full hover:bg-primary/20"
              whileHover={{ scale: 1.1, backgroundColor: primaryColor }}
              whileTap={{ scale: 0.9 }}
              aria-label="Copy link"
            >
              {copied ? <Check size={20} color={iconColor} /> : <Link size={20} color={iconColor} />}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
