import { useState, useEffect, useCallback } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
// import api from '@config/axios' // TODO: Uncomment when backend blog endpoint is ready
import MetaData from '@pages/noPage/metaData'
import { FaCalendarAlt, FaUser, FaClock, FaArrowLeft, FaShare } from 'react-icons/fa'

export default function BlogDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [relatedPosts, setRelatedPosts] = useState([])

  const fetchPost = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Since the backend doesn't have a blog endpoint yet, we'll create mock data
      // TODO: Replace with actual API call when backend blog endpoint is ready
      // const response = await api.get(`/blog/${slug}`)
      
      const mockPost = generateMockPostDetail(slug)
      if (!mockPost) {
        setError('Blog post not found')
        return
      }
      
      setPost(mockPost)
      setRelatedPosts(generateRelatedPosts())
    } catch (err) {
      setError('Failed to fetch blog post. Please try again later.')
      console.error('Error fetching post:', err)
    } finally {
      setLoading(false)
    }
  }, [slug])

  useEffect(() => {
    fetchPost()
  }, [fetchPost])

  const generateMockPostDetail = (slug) => {
    const posts = {
      'understanding-earthquake-magnitude-scales': {
        id: 1,
        title: "Understanding Earthquake Magnitude Scales",
        content: `
          <h2>Introduction to Earthquake Magnitude</h2>
          <p>Earthquake magnitude is a quantitative measure of the size or strength of an earthquake. Understanding these scales is crucial for assessing seismic risk and preparing for potential impacts.</p>
          
          <h3>The Richter Scale</h3>
          <p>Developed by Charles F. Richter in 1935, the Richter scale was the first widely-used method for measuring earthquake magnitude. It uses a logarithmic scale, meaning each whole number increase represents a tenfold increase in measured amplitude.</p>
          
          <h3>Moment Magnitude Scale (Mw)</h3>
          <p>The moment magnitude scale, introduced in the 1970s, is now the most commonly used scale for measuring large earthquakes. It provides more accurate measurements for very large earthquakes than the Richter scale.</p>
          
          <h3>Key Differences and Applications</h3>
          <p>While the Richter scale is still widely known, seismologists prefer the moment magnitude scale for its accuracy across all earthquake sizes. Understanding these scales helps in:</p>
          <ul>
            <li>Assessing building safety requirements</li>
            <li>Emergency response planning</li>
            <li>Insurance risk calculations</li>
            <li>Public safety communications</li>
          </ul>
          
          <h3>Real-World Implications</h3>
          <p>A magnitude 7.0 earthquake releases approximately 32 times more energy than a magnitude 6.0 earthquake. This exponential relationship means that even small increases in magnitude represent dramatically more powerful events.</p>
        `,
        author: "Dr. Elena Rodriguez",
        date: "2024-03-15T10:30:00Z",
        category: "Seismology",
        readTime: 8,
        tags: ["magnitude", "richter-scale", "seismology", "earthquake-measurement"]
      },
      'science-behind-seismic-waves': {
        id: 2,
        title: "The Science Behind Seismic Waves",
        content: `
          <h2>Understanding Seismic Waves</h2>
          <p>Seismic waves are the energy waves that travel through the Earth as a result of earthquakes, explosions, or other disturbances. These waves provide valuable information about both the earthquake source and the Earth's internal structure.</p>
          
          <h3>Types of Seismic Waves</h3>
          <p>There are two main categories of seismic waves: body waves and surface waves.</p>
          
          <h4>Body Waves</h4>
          <p><strong>P-waves (Primary waves):</strong> These are the fastest seismic waves and the first to be detected by seismographs. They can travel through both solid and liquid materials.</p>
          <p><strong>S-waves (Secondary waves):</strong> These waves are slower than P-waves and can only travel through solid materials. They cause more ground movement and are often more destructive.</p>
          
          <h4>Surface Waves</h4>
          <p>Surface waves travel along the Earth's surface and are typically the most destructive type of seismic wave. They include Love waves and Rayleigh waves.</p>
          
          <h3>Wave Propagation</h3>
          <p>The speed and behavior of seismic waves depend on the properties of the materials they travel through, including density, elasticity, and temperature.</p>
        `,
        author: "Prof. Marco Antonelli",
        date: "2024-03-10T14:15:00Z",
        category: "Research",
        readTime: 6,
        tags: ["seismic-waves", "p-waves", "s-waves", "earthquake-science"]
      }
    }

    return posts[slug] || null
  }

  const generateRelatedPosts = () => {
    return [
      {
        id: 3,
        title: "Building Earthquake-Resistant Structures",
        slug: "building-earthquake-resistant-structures",
        excerpt: "Discover the engineering principles and techniques used to construct buildings that can withstand seismic forces.",
        category: "Engineering",
        readTime: 7
      },
      {
        id: 4,
        title: "Italy's Seismic History: Lessons from Major Earthquakes",
        slug: "italy-seismic-history-lessons",
        excerpt: "A comprehensive overview of Italy's most significant earthquakes and the valuable lessons learned from each event.",
        category: "History",
        readTime: 9
      },
      {
        id: 5,
        title: "Modern Seismology: Technology and Innovation",
        slug: "modern-seismology-technology-innovation",
        excerpt: "Exploring the latest technologies and methodologies used by seismologists to monitor and study earthquake activity.",
        category: "Technology",
        readTime: 5
      }
    ]
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.title,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <MetaData title="Loading..." description="Loading blog post" />
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <MetaData title="Error" description="Error loading blog post" />
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
            <p className="text-gray-300 mb-4">{error}</p>
            <button
              onClick={() => navigate('/blog')}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
            >
              Back to Blog
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <MetaData title="Post Not Found" description="Blog post not found" />
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-300 mb-4">Post Not Found</h2>
            <p className="text-gray-400 mb-4">The blog post you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate('/blog')}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
            >
              Back to Blog
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <MetaData 
        title={`${post.title} - TerraQuake API Blog`} 
        description={post.content.replace(/<[^>]*>/g, '').substring(0, 160)} 
      />
      
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back to Blog Button */}
          <Link 
            to="/blog"
            className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8 transition-colors duration-200"
          >
            <FaArrowLeft className="mr-2" />
            Back to Blog
          </Link>

          {/* Article Header */}
          <article className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden">
            <div className="p-8">
              {/* Category and Share */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-semibold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full">
                  {post.category}
                </span>
                <button
                  onClick={handleShare}
                  className="flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition-colors duration-200"
                >
                  <FaShare className="w-4 h-4" />
                  <span className="text-sm">Share</span>
                </button>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8 pb-6 border-b border-gray-800">
                <div className="flex items-center space-x-2">
                  <FaUser className="text-purple-400" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaCalendarAlt className="text-purple-400" />
                  <span>{formatDate(post.date)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaClock className="text-purple-400" />
                  <span>{post.readTime} min read</span>
                </div>
              </div>

              {/* Article Content */}
              <div 
                className="prose prose-invert prose-purple max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              {post.tags && (
                <div className="mt-8 pt-6 border-t border-gray-800">
                  <h4 className="text-white font-semibold mb-3">Tags:</h4>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="text-xs bg-gray-800 text-gray-300 px-3 py-1 rounded-full hover:bg-purple-600 hover:text-white transition-colors duration-200"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </article>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-white mb-6">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <article 
                    key={relatedPost.id}
                    className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-purple-400 bg-purple-500/10 px-2 py-1 rounded-full">
                        {relatedPost.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        {relatedPost.readTime} min
                      </span>
                    </div>
                    
                    <h4 className="text-lg font-bold text-white mb-3 line-clamp-2">
                      <Link 
                        to={`/blog/${relatedPost.slug}`} 
                        className="hover:text-purple-400 transition-colors duration-200"
                      >
                        {relatedPost.title}
                      </Link>
                    </h4>
                    
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                      {relatedPost.excerpt}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}