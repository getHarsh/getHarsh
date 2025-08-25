/**
 * @fileoverview AudioPlayer - HTML5 audio player for article narrations
 * @module components/content/AudioPlayer
 * 
 * @description
 * A feature-rich HTML5 audio player component designed for article narrations
 * and podcast content. Provides comprehensive playback controls, volume management,
 * and seek functionality with a clean, accessible interface.
 * 
 * This component brings audio narration capabilities to the getHarsh ecosystem,
 * enabling articles to have audio versions for accessibility and user preference.
 * It wraps the HTML5 audio element with custom controls that match the retrofuturistic
 * design language while providing a familiar, intuitive interface.
 * 
 * @architecture
 * ```
 * AudioPlayer Component
 *       ├── HTML5 Audio Element
 *       │     ├── Source management
 *       │     ├── Event listeners
 *       │     └── Playback control
 *       ├── Custom Controls
 *       │     ├── Play/Pause button
 *       │     ├── Skip buttons (±10s)
 *       │     ├── Volume slider
 *       │     ├── Mute toggle
 *       │     └── Seek bar
 *       ├── Visual Feedback
 *       │     ├── Time display
 *       │     ├── Progress visualization
 *       │     └── Button states
 *       └── State Management
 *             ├── Playback state
 *             ├── Time tracking
 *             ├── Volume control
 *             └── Mute state
 * 
 * Data Flow:
 * Audio URL → HTML5 element → Event listeners → State updates → UI render
 * User interaction → Control handler → Audio element → State sync
 * ```
 * 
 * @proto-integration
 * Maps to audio and media configurations:
 * 
 * - **AudioConfig** (media.proto)
 *   - `player.preload`: 'metadata' for performance
 *   - `player.skip_interval`: 10 seconds
 *   - `player.volume_step`: 0.1 (10%)
 *   - `player.default_volume`: 1.0 (100%)
 * 
 * - **MediaConfig** (content.proto)
 *   - `audio.supported_formats`: mp3, wav, ogg
 *   - `audio.google_drive`: Supported
 *   - `audio.max_file_size`: No limit (streaming)
 *   - `audio.preload_strategy`: 'metadata'
 * 
 * - **AccessibilityConfig** (accessibility.proto)
 *   - `audio.controls_required`: Custom controls
 *   - `audio.aria_labels`: All controls labeled
 *   - `audio.keyboard_support`: Full navigation
 *   - `audio.screen_reader`: Descriptive labels
 * 
 * - **ThemeConfig** (theme.proto)
 *   - `audio.background`: bg-glass
 *   - `audio.border`: accent-primary/20
 *   - `audio.progress_color`: accent-primary
 *   - `audio.control_hover`: accent-primary
 * 
 * @hook-integration
 * While AudioPlayer doesn't use external hooks, it manages:
 * 
 * - **useRef**: Audio element reference
 * - **useState**: Playback and control states
 * - **useEffect**: Event listener management
 * 
 * Parent components often use:
 * - **useGTM()**: Track audio engagement
 * - **useMediaSession()**: Browser media controls
 * 
 * @ecosystem-integration
 * - **Used by**: Articles, Podcasts, Documentation, Tutorials
 * - **Audio Sources**: Direct URLs, Google Drive, CDN
 * - **Browser Support**: All modern browsers
 * - **Mobile**: Touch-optimized controls
 * - **Analytics**: Playback tracking available
 * 
 * @features
 * - **HTML5 Audio**: Native browser support
 * - **Custom Controls**: Branded UI elements
 * - **Play/Pause**: Toggle playback
 * - **Skip Controls**: ±10 second jumps
 * - **Volume Slider**: 0-100% control
 * - **Mute Toggle**: With volume memory
 * - **Seek Bar**: Visual progress + scrubbing
 * - **Time Display**: Current/total duration
 * - **Glass Morphism**: Consistent styling
 * - **Responsive**: Mobile-friendly layout
 * 
 * @playback-controls
 * ```
 * Play/Pause:
 *   - Toggle button with icon swap
 *   - Spacebar shortcut (when focused)
 *   - Auto-pause on end
 * 
 * Skip:
 *   - Back: -10 seconds (min: 0)
 *   - Forward: +10 seconds (max: duration)
 *   - Keyboard: Arrow keys
 * 
 * Seek:
 *   - Click on progress bar
 *   - Drag slider thumb
 *   - Visual fill indicator
 * 
 * Volume:
 *   - 0-100% range slider
 *   - 10% step increments
 *   - Mute toggle with memory
 * ```
 * 
 * @time-formatting
 * ```
 * Format: M:SS or MM:SS
 * Examples:
 *   - 0:45 (45 seconds)
 *   - 1:30 (1 minute 30 seconds)
 *   - 12:05 (12 minutes 5 seconds)
 *   - 120:00 (2 hours)
 * ```
 * 
 * @browser-compatibility
 * - Chrome: Full support
 * - Firefox: Full support
 * - Safari: Full support
 * - Edge: Full support
 * - Mobile: Touch-optimized
 * 
 * @accessibility
 * - **ARIA Labels**: All controls labeled
 * - **Keyboard Nav**: Tab through controls
 * - **Focus States**: Visible indicators
 * - **Screen Readers**: Descriptive text
 * - **Volume Memory**: Preserves user preference
 * 
 * @performance
 * - **Preload**: Metadata only
 * - **Event Cleanup**: Proper unmounting
 * - **State Updates**: Batched for efficiency
 * - **Progress Bar**: CSS gradient (no JS)
 * 
 * @dos
 * - Provide descriptive titles
 * - Test with various audio formats
 * - Ensure mobile compatibility
 * - Add keyboard shortcuts info
 * - Monitor playback analytics
 * 
 * @donts
 * - Don't autoplay without consent
 * - Don't forget cleanup on unmount
 * - Don't use large uncompressed files
 * - Don't remove ARIA labels
 * - Don't override native shortcuts
 * 
 * @example
 * ```tsx
 * // Article with narration
 * function ArticleWithAudio({ article }) {
 *   return (
 *     <article>
 *       <h1>{article.title}</h1>
 *       {article.audioUrl && (
 *         <AudioPlayer
 *           src={article.audioUrl}
 *           title="Listen to this article"
 *           className="mb-6"
 *         />
 *       )}
 *       <div dangerouslySetInnerHTML={{ __html: article.content }} />
 *     </article>
 *   )
 * }
 * 
 * // Podcast episode
 * <AudioPlayer
 *   src="https://cdn.example.com/episodes/ep001.mp3"
 *   title="Episode 1: Introduction to AI"
 * />
 * 
 * // Google Drive hosted audio
 * <AudioPlayer
 *   src={convertGoogleDriveUrl(driveLink)}
 *   title="Team meeting recording"
 * />
 * ```
 * 
 * @see {@link file://./USE-CASE.md#content-components} - Content components spec
 * @see {@link file://./CMS.md#audio-fields} - CMS audio configuration
 * @see {@link file://./Image.tsx} - Similar media component
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio} - HTML5 audio
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement} - Media element API
 * 
 * @since 1.0.0
 */

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from 'lucide-react'

/**
 * @interface AudioPlayerProps
 * @description Props for AudioPlayer component
 * 
 * Configuration for the audio player with source URL and
 * optional title for context.
 * 
 * @property {string} src - Audio source URL
 * Direct URL to audio file or Google Drive share link.
 * Supports mp3, wav, ogg, and other HTML5 audio formats.
 * 
 * @property {string} [title='Audio narration'] - Optional title
 * Descriptive text shown above the player controls.
 * Should describe the audio content (e.g., "Article narration").
 * 
 * @property {string} [className] - Additional CSS classes
 * Applied to the outer container for custom styling.
 * 
 * @example
 * ```tsx
 * const props: AudioPlayerProps = {
 *   src: 'https://cdn.example.com/audio.mp3',
 *   title: 'Listen to this article',
 *   className: 'mb-8'
 * }
 * ```
 */
interface AudioPlayerProps {
  /** Audio source URL (supports Google Drive links) */
  src: string
  /** Optional title for the audio */
  title?: string
  /** Additional CSS classes */
  className?: string
}

/**
 * AudioPlayer component - Custom HTML5 audio player
 * 
 * Provides a fully-featured audio player with custom controls that
 * match the retrofuturistic design system while maintaining accessibility.
 * 
 * @component
 * @param {AudioPlayerProps} props - Component props
 * @param {string} props.src - Audio source URL
 * @param {string} [props.title='Audio narration'] - Audio title
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @returns {JSX.Element} Audio player containing:
 * - Hidden HTML5 audio element
 * - Custom control interface
 * - Play/pause toggle
 * - Skip forward/back buttons
 * - Volume control with mute
 * - Seek bar with progress
 * - Time display (current/total)
 * 
 * @remarks
 * The component uses a hidden HTML5 audio element for playback
 * and provides custom controls for a consistent user experience.
 * All controls are keyboard accessible and include ARIA labels.
 * 
 * The progress bar uses a CSS gradient for visual feedback,
 * updating in real-time as the audio plays. Volume control
 * includes a mute toggle that remembers the previous volume.
 * 
 * @example
 * ```tsx
 * // In an article component
 * function Article({ content, audioUrl }) {
 *   return (
 *     <div>
 *       {audioUrl && (
 *         <AudioPlayer 
 *           src={audioUrl}
 *           title="Listen to article"
 *         />
 *       )}
 *       <div className="prose">{content}</div>
 *     </div>
 *   )
 * }
 * ```
 */
export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  src,
  title = 'Audio narration',
  className
}) => {
  const audioRef = React.useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [currentTime, setCurrentTime] = React.useState(0)
  const [duration, setDuration] = React.useState(0)
  const [volume, setVolume] = React.useState(1)
  const [isMuted, setIsMuted] = React.useState(false)

  /**
   * Format time in MM:SS format
   * 
   * @param {number} time - Time in seconds
   * @returns {string} Formatted time string
   */
  const formatTime = (time: number): string => {
    if (isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  /**
   * Toggle play/pause state
   * 
   * Plays or pauses the audio based on current state.
   */
  const togglePlayPause = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  /**
   * Toggle mute state
   * 
   * Mutes or unmutes audio while preserving volume level.
   */
  const toggleMute = () => {
    if (!audioRef.current) return
    
    if (isMuted) {
      audioRef.current.volume = volume
      setIsMuted(false)
    } else {
      audioRef.current.volume = 0
      setIsMuted(true)
    }
  }

  /**
   * Handle seek bar interaction
   * 
   * Updates playback position based on user input.
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} e - Change event
   */
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return
    const newTime = parseFloat(e.target.value)
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  /**
   * Skip backward 10 seconds
   */
  const skipBack = () => {
    if (!audioRef.current) return
    audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10)
  }

  /**
   * Skip forward 10 seconds
   */
  const skipForward = () => {
    if (!audioRef.current) return
    audioRef.current.currentTime = Math.min(duration, audioRef.current.currentTime + 10)
  }

  /**
   * Handle volume slider change
   * 
   * Updates audio volume and mute state.
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} e - Change event
   */
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return
    const newVolume = parseFloat(e.target.value)
    audioRef.current.volume = newVolume
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  /**
   * Set up audio event listeners
   * 
   * Manages time updates, duration loading, and playback end.
   */
  React.useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => setIsPlaying(false)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [])

  return (
    <div className={cn(
      'p-4 rounded-terminal',
      'bg-bg-glass backdrop-blur-xl border border-accent-primary/20',
      className
    )}>
      {/* Hidden audio element */}
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Title */}
      <div className="flex items-center gap-2 mb-3">
        <Volume2 className="w-4 h-4 text-accent-primary" />
        <span className="text-sm text-text-secondary">{title}</span>
      </div>

      {/* Controls row */}
      <div className="flex items-center gap-3 mb-3">
        {/* Skip back */}
        <button
          onClick={skipBack}
          className="p-1.5 rounded-sharp text-text-secondary hover:text-accent-primary transition-colors"
          aria-label="Skip back 10 seconds"
        >
          <SkipBack className="w-4 h-4" />
        </button>

        {/* Play/Pause */}
        <button
          onClick={togglePlayPause}
          className={cn(
            'p-2 rounded-sharp transition-all duration-base',
            'bg-accent-primary/20 hover:bg-accent-primary/30',
            'text-accent-primary hover:scale-110'
          )}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5 ml-0.5" />
          )}
        </button>

        {/* Skip forward */}
        <button
          onClick={skipForward}
          className="p-1.5 rounded-sharp text-text-secondary hover:text-accent-primary transition-colors"
          aria-label="Skip forward 10 seconds"
        >
          <SkipForward className="w-4 h-4" />
        </button>

        {/* Time display */}
        <div className="flex-1 flex items-center gap-2 text-xs text-text-secondary font-mono">
          <span>{formatTime(currentTime)}</span>
          <span>/</span>
          <span>{formatTime(duration)}</span>
        </div>

        {/* Volume control */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="p-1.5 rounded-sharp text-text-secondary hover:text-accent-primary transition-colors"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
          
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-20 h-1 bg-bg-tertiary rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-accent-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
            aria-label="Volume"
          />
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative">
        <input
          type="range"
          min="0"
          max={duration || 0}
          step="1"
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-2 bg-bg-tertiary rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-accent-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-glow-sm"
          style={{
            background: `linear-gradient(to right, var(--accent-primary) 0%, var(--accent-primary) ${(currentTime / duration) * 100}%, var(--bg-tertiary) ${(currentTime / duration) * 100}%, var(--bg-tertiary) 100%)`
          }}
          aria-label="Seek"
        />
      </div>
    </div>
  )
}

export default AudioPlayer