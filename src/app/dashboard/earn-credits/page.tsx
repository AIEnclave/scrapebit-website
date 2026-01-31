'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useBilling } from '@/hooks/useBilling'
import { 
  Zap, 
  Gift, 
  Check, 
  Star, 
  Twitter, 
  Linkedin, 
  Facebook, 
  Share2,
  ArrowLeft,
  X,
  ChevronRight,
  Loader2,
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'

const rewards = [
  {
    id: 'signup',
    title: 'Sign Up',
    description: 'Complete your account setup',
    reward: '+10 credits',
    icon: Check,
    enabled: true,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    steps: [
      {
        title: 'Step 1: Complete Account Setup',
        description: 'Make sure you have completed your account registration and verified your email address.'
      },
      {
        title: 'Step 2: Claim Your Reward',
        description: 'Click the claim button below to automatically receive your signup bonus credits.'
      },
      {
        title: 'Step 3: Verification & Credits',
        description: 'We will verify your account status and add 10 credits to your account immediately.'
      }
    ],
  },
  {
    id: 'review',
    title: 'Leave a Review',
    description: 'Give us a 5-star review on Chrome Web Store',
    reward: '+20 credits',
    icon: Star,
    enabled: true,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    steps: [
      {
        title: 'Step 1: Write a Review',
        description: 'Visit the Chrome Web Store and write a 5-star review about your experience with Scrapebit.',
        link: 'https://chromewebstore.google.com'
      },
      {
        title: 'Step 2: Enter Review Link',
        description: 'After posting your review, copy the review link and paste it below. Also include your review comment.',
        requiresLink: true,
        requiresComment: true
      },
      {
        title: 'Step 3: Verification & Credits',
        description: 'We will verify your review and add 20 credits to your account within 24 hours.'
      }
    ],
  },
  {
    id: 'twitter_share',
    title: 'Share on Twitter',
    description: 'Share Scrapebit on Twitter',
    reward: '+50 credits',
    icon: Twitter,
    enabled: true,
    color: 'text-blue-400',
    bgColor: 'bg-blue-50',
    steps: [
      {
        title: 'Step 1: Share on Twitter',
        description: 'Post a tweet about Scrapebit on Twitter. Make sure to include the hashtag #Scrapebit in your tweet.',
        link: 'https://scrapebit.com'
      },
      {
        title: 'Step 2: Enter Tweet Link & Content',
        description: 'Copy the link to your tweet and paste it below. Also paste your tweet content (must include #Scrapebit).',
        requiresLink: true,
        requiresComment: true,
        requiresHashtag: true
      },
      {
        title: 'Step 3: Verification & Credits',
        description: 'We will verify your tweet includes the hashtag and add 50 credits to your account within 24 hours.'
      }
    ],
  },
  {
    id: 'linkedin_share',
    title: 'Share on LinkedIn',
    description: 'Share Scrapebit on LinkedIn',
    reward: '+50 credits',
    icon: Linkedin,
    enabled: true,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    steps: [
      {
        title: 'Step 1: Share on LinkedIn',
        description: 'Post about Scrapebit on LinkedIn. Make sure to include the hashtag #Scrapebit in your post.',
        link: 'https://scrapebit.com'
      },
      {
        title: 'Step 2: Enter Post Link & Content',
        description: 'Copy the link to your LinkedIn post and paste it below. Also paste your post content (must include #Scrapebit).',
        requiresLink: true,
        requiresComment: true,
        requiresHashtag: true
      },
      {
        title: 'Step 3: Verification & Credits',
        description: 'We will verify your post includes the hashtag and add 50 credits to your account within 24 hours.'
      }
    ],
  },
  {
    id: 'facebook_share',
    title: 'Share on Facebook',
    description: 'Share Scrapebit on Facebook',
    reward: '+50 credits',
    icon: Facebook,
    enabled: true,
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    steps: [
      {
        title: 'Step 1: Share on Facebook',
        description: 'Post about Scrapebit on Facebook. Make sure to include the hashtag #Scrapebit in your post.',
        link: 'https://scrapebit.com'
      },
      {
        title: 'Step 2: Enter Post Link & Content',
        description: 'Copy the link to your Facebook post and paste it below. Also paste your post content (must include #Scrapebit).',
        requiresLink: true,
        requiresComment: true,
        requiresHashtag: true
      },
      {
        title: 'Step 3: Verification & Credits',
        description: 'We will verify your post includes the hashtag and add 50 credits to your account within 24 hours.'
      }
    ],
  },
  {
    id: 'share_with_friends',
    title: 'Share with Friends',
    description: 'Share Scrapebit with your friends and get rewarded',
    reward: '+30 credits',
    icon: Share2,
    enabled: true,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    steps: [
      {
        title: 'Step 1: Share with Friends',
        description: 'Share Scrapebit with your friends via email, messaging apps, or social media. Make sure to include the hashtag #Scrapebit.',
        link: 'https://scrapebit.com'
      },
      {
        title: 'Step 2: Enter Share Details',
        description: 'Tell us how you shared Scrapebit. Paste any link to your share (if applicable) and describe how you shared it (must mention #Scrapebit).',
        requiresLink: false,
        requiresComment: true,
        requiresHashtag: true
      },
      {
        title: 'Step 3: Verification & Credits',
        description: 'We will verify your share includes the hashtag and add 30 credits to your account within 24 hours.'
      }
    ],
  },
]

export default function EarnCreditsPage() {
  const router = useRouter()
  const supabase = createClient()
  const { billingStatus, refetch: refetchBilling } = useBilling()
  const [claimingReward, setClaimingReward] = useState<string | null>(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState<{ type: string; credits: number } | null>(null)
  const [claimedRewards, setClaimedRewards] = useState<Record<string, boolean>>({})
  const [showModal, setShowModal] = useState(false)
  const [selectedReward, setSelectedReward] = useState<string | null>(null)
  const [modalStep, setModalStep] = useState(1)
  const [link, setLink] = useState('')
  const [comment, setComment] = useState('')
  const [loadingStatus, setLoadingStatus] = useState(true)

  // Fetch claim status on mount
  useEffect(() => {
    const fetchClaimStatus = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
          setLoadingStatus(false)
          return
        }

        const response = await fetch('http://localhost:3000/api/billing/rewards/status', {
          headers: {
            'Authorization': `Bearer ${session.access_token}`
          }
        })

        if (response.ok) {
          const { data } = await response.json()
          setClaimedRewards(data.claimedRewards || {})
        }
      } catch (error) {
        console.error('Error fetching claim status:', error)
      } finally {
        setLoadingStatus(false)
      }
    }

    fetchClaimStatus()
  }, [])

  const claimReward = async (rewardType: string, linkValue?: string, commentValue?: string) => {
    if (claimingReward) return

    try {
      setClaimingReward(rewardType)
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        alert('Please log in first')
        setClaimingReward(null)
        return
      }

      const body: any = { rewardType }
      if (linkValue) body.link = linkValue
      if (commentValue) body.comment = commentValue

      const response = await fetch('http://localhost:3000/api/billing/rewards/claim', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify(body)
      })

      if (response.ok) {
        const result = await response.json()
        setShowSuccessMessage({ type: rewardType, credits: result.creditsGranted })
        await refetchBilling()
        setShowModal(false)
        setSelectedReward(null)
        setModalStep(1)
        setLink('')
        setComment('')
        
        // Update claimed rewards
        const oneTimeRewards = ['signup', 'review']
        if (oneTimeRewards.includes(rewardType)) {
          setClaimedRewards(prev => ({ ...prev, [rewardType]: true }))
        }
        
        setTimeout(() => {
          setShowSuccessMessage(null)
        }, 5000)
      } else {
        const error = await response.json()
        if (error.alreadyClaimed) {
          alert('You have already claimed this reward!')
          setClaimedRewards(prev => ({ ...prev, [rewardType]: true }))
        } else if (error.requiresHashtag) {
          alert('Your comment must include the hashtag #Scrapebit')
        } else {
          alert(`Failed to claim reward: ${error.error || 'Unknown error'}`)
        }
      }
    } catch (error) {
      console.error('Claim reward error:', error)
      alert('Failed to claim reward. Please try again.')
    } finally {
      setClaimingReward(null)
    }
  }

  const handleModalNext = () => {
    const reward = rewards.find(r => r.id === selectedReward)
    if (!reward) return

    if (modalStep === 2) {
      // Validate step 2 inputs
      if (reward.steps[1].requiresLink && !link.trim()) {
        alert('Please enter the link')
        return
      }
      if (reward.steps[1].requiresComment && !comment.trim()) {
        alert('Please enter your comment/post')
        return
      }
      if ('requiresHashtag' in reward.steps[1] && reward.steps[1].requiresHashtag && !comment.includes('#Scrapebit')) {
        alert('Your comment must include the hashtag #Scrapebit')
        return
      }
    }

    if (modalStep < 3) {
      setModalStep(modalStep + 1)
    } else {
      // Final step - claim the reward
      const socialRewards = ['twitter_share', 'linkedin_share', 'facebook_share', 'review', 'share_with_friends']
      if (socialRewards.includes(selectedReward || '')) {
        claimReward(selectedReward || '', link, comment)
      } else {
        claimReward(selectedReward || '')
      }
    }
  }

  const handleModalBack = () => {
    if (modalStep > 1) {
      setModalStep(modalStep - 1)
    }
  }

  const selectedRewardData = rewards.find(r => r.id === selectedReward)
  const isClaimed = selectedReward ? claimedRewards[selectedReward] : false

  return (
    <div className="h-screen overflow-auto bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/buy-credits"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Gift className="w-5 h-5" />
                Earn Free Credits
              </h1>
              <p className="text-sm text-gray-500">Complete tasks to earn free credits</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        {showSuccessMessage && (
          <div className="mb-6 p-4 rounded-xl border bg-green-50 border-green-200">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100">
                <Check className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-green-800">
                  🎉 Reward Claimed!
                </p>
                <p className="text-sm text-green-700">
                  You've earned {showSuccessMessage.credits} credits! Your balance has been updated.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Current Credits Display */}
        <div className="mb-6 p-6 rounded-xl border bg-white border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Current Balance</p>
              <p className="text-3xl font-bold flex items-center gap-2 text-gray-900">
                <Zap className="w-7 h-7 text-amber-500" />
                {billingStatus?.credits?.creditsRemaining ?? 0} credits
              </p>
            </div>
            <Gift className="w-16 h-16 text-brand-500" />
          </div>
        </div>

        {/* Rewards List */}
        <div className="space-y-4">
          {rewards.map((reward) => {
            const Icon = reward.icon
            const isClaiming = claimingReward === reward.id

            return (
              <div
                key={reward.id}
                className={`
                  p-6 rounded-xl border transition-all bg-white border-gray-200
                  ${reward.enabled ? 'hover:border-brand-500 cursor-pointer shadow-sm' : 'opacity-60'}
                `}
                onClick={() => {
                  if (reward.enabled && !isClaiming) {
                    setSelectedReward(reward.id)
                    setShowModal(true)
                    setModalStep(1)
                    setLink('')
                    setComment('')
                  }
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`p-4 rounded-xl ${reward.bgColor}`}>
                      <Icon className={`w-7 h-7 ${reward.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900">
                        {reward.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {reward.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="px-4 py-2 rounded-lg bg-amber-50">
                      <span className="text-sm font-bold flex items-center gap-1 text-amber-600">
                        <Zap className="w-4 h-4" />
                        {reward.reward}
                      </span>
                    </div>
                    {isClaiming ? (
                      <Loader2 className="w-5 h-5 animate-spin text-brand-500" />
                    ) : claimedRewards[reward.id] ? (
                      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-100">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-medium text-green-600">Claimed</span>
                      </div>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedReward(reward.id)
                          setShowModal(true)
                          setModalStep(1)
                          setLink('')
                          setComment('')
                        }}
                        className={`
                          px-6 py-2.5 rounded-lg text-sm font-medium transition-colors
                          ${reward.enabled
                            ? 'bg-brand-500 hover:bg-brand-600 text-white'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }
                        `}
                        disabled={!reward.enabled || isClaiming}
                      >
                        Claim
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Info Section */}
        <div className="mt-8 p-6 rounded-xl bg-blue-50 border border-blue-200">
          <h3 className="font-semibold mb-3 text-gray-900">
            💡 How it works
          </h3>
          <ul className="text-sm space-y-2 text-gray-600">
            <li>• Complete tasks to earn free credits</li>
            <li>• Credits never expire</li>
            <li>• Each credit = 1 scrape operation</li>
            <li>• Some rewards can be claimed multiple times</li>
          </ul>
        </div>
      </div>

      {/* Claim Modal */}
      {showModal && selectedRewardData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl border border-gray-200 w-full max-w-2xl max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg ${selectedRewardData.bgColor}`}>
                    <selectedRewardData.icon className={`w-7 h-7 ${selectedRewardData.color}`} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedRewardData.title}</h2>
                    <p className="text-sm text-gray-500">{selectedRewardData.reward}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowModal(false)
                    setSelectedReward(null)
                    setModalStep(1)
                    setLink('')
                    setComment('')
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {selectedRewardData.steps && selectedRewardData.steps[modalStep - 1] && (
                <div className="space-y-6">
                  {/* Step Indicator */}
                  <div className="flex items-center justify-center gap-2">
                    {[1, 2, 3].map((step) => (
                      <div key={step} className="flex items-center gap-2">
                        <div
                          className={`
                            w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
                            ${step === modalStep
                              ? 'bg-brand-500 text-white'
                              : step < modalStep
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-200 text-gray-500'
                            }
                          `}
                        >
                          {step < modalStep ? <Check className="w-5 h-5" /> : step}
                        </div>
                        {step < 3 && (
                          <div
                            className={`
                              w-16 h-1
                              ${step < modalStep ? 'bg-green-500' : 'bg-gray-200'}
                            `}
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Step Content */}
                  <div className="text-center space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {selectedRewardData.steps[modalStep - 1].title}
                    </h3>
                    <div className="text-gray-600 space-y-2">
                      <p>
                        {selectedRewardData.steps[modalStep - 1].description}
                      </p>
                      {selectedRewardData.steps[modalStep - 1].link && (
                        <a 
                          href={selectedRewardData.steps[modalStep - 1].link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-500 hover:text-brand-600 underline inline-block"
                        >
                          {selectedRewardData.steps[modalStep - 1].link}
                        </a>
                      )}
                    </div>

                    {/* Step 2: Link and Comment Inputs */}
                    {modalStep === 2 && (selectedRewardData.steps[1].requiresLink || selectedRewardData.steps[1].requiresComment) && (
                      <div className="space-y-4 mt-6">
                        {selectedRewardData.steps[1].requiresLink && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                              Link to your {selectedRewardData.id === 'review' ? 'review' : 'post'}
                            </label>
                            <input
                              type="url"
                              value={link}
                              onChange={(e) => setLink(e.target.value)}
                              placeholder={`https://...`}
                              className="w-full px-4 py-2 rounded-lg border text-sm bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                            />
                          </div>
                        )}
                        {selectedRewardData.steps[1].requiresComment && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                              {selectedRewardData.id === 'review' 
                                ? 'Your review comment'
                                : selectedRewardData.id === 'share_with_friends'
                                ? 'How did you share Scrapebit?'
                                : 'Your post content'}
                              {'requiresHashtag' in selectedRewardData.steps[1] && selectedRewardData.steps[1].requiresHashtag && (
                                <span className="text-red-500"> * (Must include #Scrapebit)</span>
                              )}
                            </label>
                            <textarea
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              placeholder={selectedRewardData.id === 'review' 
                                ? 'Paste your review comment here...'
                                : selectedRewardData.id === 'share_with_friends'
                                ? 'Describe how you shared Scrapebit (must include #Scrapebit)...'
                                : 'Paste your post content here (must include #Scrapebit)...'
                              }
                              rows={4}
                              className="w-full px-4 py-2 rounded-lg border text-sm bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                            />
                            {'requiresHashtag' in selectedRewardData.steps[1] && selectedRewardData.steps[1].requiresHashtag && (
                              <p className="text-xs text-gray-500 mt-1 text-left">
                                Don't forget to include #Scrapebit in your {selectedRewardData.id === 'review' ? 'review' : 'post'}!
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 flex items-center justify-between">
              <button
                onClick={handleModalBack}
                disabled={modalStep === 1}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2
                  ${modalStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }
                `}
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={handleModalNext}
                disabled={claimingReward === selectedReward}
                className={`
                  px-6 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2
                  ${claimingReward === selectedReward
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : 'bg-brand-500 hover:bg-brand-600 text-white'
                  }
                `}
              >
                {claimingReward === selectedReward ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Claiming...
                  </>
                ) : modalStep === 3 ? (
                  'Claim Reward'
                ) : (
                  <>
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

