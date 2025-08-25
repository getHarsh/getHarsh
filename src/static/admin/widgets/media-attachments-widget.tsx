/**
 * @fileoverview Media Attachments Widget for Rich Content Management
 * @module static/admin/widgets/media-attachments-widget
 * 
 * @description
 * Custom CMS widget for managing multimedia attachments in articles.
 * This widget provides a comprehensive interface for adding audio recordings,
 * video embeds, code snippets, and technical diagrams to blog posts,
 * supporting the rich content strategy of the getHarsh ecosystem.
 * 
 * The widget implements the ArticleMedia protobuf message from blog.proto,
 * enabling creators to enhance articles with multiple media types.
 * 
 * @architecture
 * The media system uses a multi-format approach:
 * 1. **Audio**: Recordings with transcripts (Google Drive integration)
 * 2. **Videos**: YouTube, Vimeo, custom embeds with thumbnails
 * 3. **Code Snippets**: Inline code or GitHub Gists
 * 4. **Diagrams**: Mermaid, GraphViz, PlantUML, or images
 * 5. **Metadata**: Titles, durations, captions for all media
 * 
 * @proto-integration
 * Maps to ArticleMedia message in blog.proto:
 * ```protobuf
 * message ArticleMedia {
 *   optional AudioRecording audio = 1;
 *   repeated VideoEmbed videos = 2;
 *   repeated CodeSnippet code_snippets = 3;
 *   repeated Diagram diagrams = 4;
 * }
 * 
 * message AudioRecording {
 *   optional string title = 1;
 *   optional string url = 2;
 *   optional int32 duration_seconds = 3;
 *   optional string transcript_url = 4;
 *   optional GoogleDriveInfo google_drive = 5;
 * }
 * 
 * message VideoEmbed {
 *   optional string title = 1;
 *   optional string url = 2;
 *   optional VideoPlatform platform = 3;
 *   optional int32 duration_seconds = 4;
 *   optional string thumbnail_url = 5;
 *   optional string embed_code = 6;
 * }
 * ```
 * 
 * @ecosystem-integration
 * - Google Drive: Audio file storage and streaming
 * - YouTube API: Video metadata extraction
 * - GitHub Gist: Code snippet embedding
 * - Mermaid: Diagram rendering engine
 * - Build System: Media processing during Phase 6
 * - CDN: Media file optimization and delivery
 * - Analytics: Media engagement tracking via GTM
 * 
 * @features
 * - **Audio Management**: Upload, link, and transcribe audio
 * - **Video Embedding**: Multi-platform video support
 * - **Code Snippets**: Syntax-highlighted code blocks
 * - **Diagram Creation**: Technical diagrams with multiple formats
 * - **Google Drive Integration**: Direct audio streaming
 * - **Metadata Tracking**: Duration, titles, descriptions
 * - **Preview Support**: Visual preview of media items
 * 
 * @media-types
 * - **Audio**: MP3, WAV, OGG with optional transcripts
 * - **Video**: YouTube, Vimeo, self-hosted with thumbnails
 * - **Code**: JavaScript, Python, Go, etc. with highlighting
 * - **Diagrams**: Mermaid flowcharts, GraphViz, PlantUML
 * 
 * @ui-components
 * - Tabbed interface for media type selection
 * - Expandable sections for detailed configuration
 * - Drag-and-drop support for file uploads
 * - Preview panels for visual confirmation
 * - Validation indicators for required fields
 * 
 * @google-drive-integration
 * Audio files can be stored in Google Drive:
 * 1. Upload to shared Drive folder
 * 2. Get file ID from share link
 * 3. Widget generates streaming URL
 * 4. Audio player embeds in article
 * 5. Optional transcript linking
 * 
 * @dos
 * - Add alt text for visual media
 * - Include transcripts for audio
 * - Use appropriate video platforms
 * - Provide code language hints
 * - Test diagram rendering
 * - Optimize media file sizes
 * 
 * @donts
 * - Don't embed large video files directly
 * - Don't skip accessibility metadata
 * - Don't use proprietary formats
 * - Don't forget mobile optimization
 * - Don't ignore loading performance
 * 
 * @example
 * ```yaml
 * media:
 *   audio:
 *     title: "Podcast Episode 1"
 *     url: "/audio/episode1.mp3"
 *     duration_seconds: 1800
 *     transcript_url: "/transcripts/episode1.txt"
 *   videos:
 *     - title: "Tutorial Video"
 *       url: "https://youtube.com/watch?v=..."
 *       platform: "YouTube"
 *       duration_seconds: 600
 *   code_snippets:
 *     - title: "Example Implementation"
 *       language: "typescript"
 *       gist_url: "https://gist.github.com/..."
 *   diagrams:
 *     - title: "Architecture Diagram"
 *       type: "Mermaid"
 *       source: "graph TD; A-->B; B-->C;"
 * ```
 * 
 * @see {@link file://./CMS.md#media-attachments} - Media documentation
 * @see {@link file://./BUILD.md#media-processing} - Media build pipeline
 * @see {@link file://./config/schema/blog.proto#ArticleMedia} - Proto definition
 * @see {@link file://./src/components/content/AudioPlayer.tsx} - Audio component
 * @see {@link file://./src/components/content/MermaidDiagram.tsx} - Diagram renderer
 * 
 * @since 1.0.0
 */

import React from 'react';
import { ProtoAwareWidget } from './base-widget';

// Type definitions based on ArticleMedia schema
interface AudioRecording {
  title?: string;
  url?: string;
  duration_seconds?: number;
  transcript_url?: string;
  google_drive?: {
    file_id?: string;
    folder_id?: string;
    shared_link?: string;
  };
}

interface VideoEmbed {
  title?: string;
  url?: string;
  platform?: 'YouTube' | 'Vimeo' | 'Custom';
  duration_seconds?: number;
  thumbnail_url?: string;
  embed_code?: string;
}

interface CodeSnippet {
  title?: string;
  language?: string;
  gist_url?: string;
  code?: string;
  filename?: string;
}

interface Diagram {
  title?: string;
  type?: 'Mermaid' | 'GraphViz' | 'PlantUML' | 'Image';
  source?: string;
  rendered_url?: string;
  caption?: string;
}

interface MediaAttachments {
  audio?: AudioRecording;
  videos?: VideoEmbed[];
  code_snippets?: CodeSnippet[];
  diagrams?: Diagram[];
}

// State interface for MediaAttachmentsWidget
interface MediaAttachmentsState {
  activeTab: 'audio' | 'videos' | 'code' | 'diagrams';
  expandedSections: Record<string, boolean>;
}

/**
 * Media Attachments Widget Component.
 * Manages audio, video, code, and diagram attachments for articles.
 * 
 * @extends {ProtoAwareWidget<MediaAttachments, MediaAttachmentsState>}
 * @class
 */
export class MediaAttachmentsWidget extends ProtoAwareWidget<MediaAttachments, MediaAttachmentsState> {
  state: MediaAttachmentsState = {
    activeTab: 'audio',
    expandedSections: {}
  };

  /**
   * Handle adding a new video
   */
  addVideo = () => {
    const current = this.props.value || {};
    const videos = current.videos || [];
    const newVideo: VideoEmbed = {
      title: '',
      url: '',
      platform: 'YouTube'
    };
    
    this.handleChange({
      ...current,
      videos: [...videos, newVideo]
    });
    this.trackInteraction('add_video', JSON.stringify(newVideo));
  };

  /**
   * Handle removing a video
   */
  removeVideo = (index: number) => {
    const current = this.props.value || {};
    const videos = current.videos || [];
    
    this.handleChange({
      ...current,
      videos: videos.filter((_, i) => i !== index)
    });
    this.trackInteraction('remove_video', index);
  };

  /**
   * Handle updating a video
   */
  updateVideo = (index: number, updates: Partial<VideoEmbed>) => {
    const current = this.props.value || {};
    const videos = current.videos || [];
    
    const updatedVideos = [...videos];
    updatedVideos[index] = { ...updatedVideos[index], ...updates };
    
    this.handleChange({
      ...current,
      videos: updatedVideos
    });
  };

  /**
   * Handle adding a code snippet
   */
  addCodeSnippet = () => {
    const current = this.props.value || {};
    const snippets = current.code_snippets || [];
    const newSnippet: CodeSnippet = {
      title: '',
      language: 'javascript',
      code: ''
    };
    
    this.handleChange({
      ...current,
      code_snippets: [...snippets, newSnippet]
    });
    this.trackInteraction('add_code_snippet', JSON.stringify(newSnippet));
  };

  /**
   * Handle removing a code snippet
   */
  removeCodeSnippet = (index: number) => {
    const current = this.props.value || {};
    const snippets = current.code_snippets || [];
    
    this.handleChange({
      ...current,
      code_snippets: snippets.filter((_, i) => i !== index)
    });
    this.trackInteraction('remove_code_snippet', index);
  };

  /**
   * Handle updating a code snippet
   */
  updateCodeSnippet = (index: number, updates: Partial<CodeSnippet>) => {
    const current = this.props.value || {};
    const snippets = current.code_snippets || [];
    
    const updatedSnippets = [...snippets];
    updatedSnippets[index] = { ...updatedSnippets[index], ...updates };
    
    this.handleChange({
      ...current,
      code_snippets: updatedSnippets
    });
  };

  /**
   * Handle adding a diagram
   */
  addDiagram = () => {
    const current = this.props.value || {};
    const diagrams = current.diagrams || [];
    const newDiagram: Diagram = {
      title: '',
      type: 'Mermaid',
      source: ''
    };
    
    this.handleChange({
      ...current,
      diagrams: [...diagrams, newDiagram]
    });
    this.trackInteraction('add_diagram', JSON.stringify(newDiagram));
  };

  /**
   * Handle removing a diagram
   */
  removeDiagram = (index: number) => {
    const current = this.props.value || {};
    const diagrams = current.diagrams || [];
    
    this.handleChange({
      ...current,
      diagrams: diagrams.filter((_, i) => i !== index)
    });
    this.trackInteraction('remove_diagram', index);
  };

  /**
   * Handle updating a diagram
   */
  updateDiagram = (index: number, updates: Partial<Diagram>) => {
    const current = this.props.value || {};
    const diagrams = current.diagrams || [];
    
    const updatedDiagrams = [...diagrams];
    updatedDiagrams[index] = { ...updatedDiagrams[index], ...updates };
    
    this.handleChange({
      ...current,
      diagrams: updatedDiagrams
    });
  };

  /**
   * Handle updating audio recording
   */
  updateAudio = (updates: Partial<AudioRecording>) => {
    const current = this.props.value || {};
    
    this.handleChange({
      ...current,
      audio: { ...current.audio, ...updates }
    });
  };

  /**
   * Toggle section expansion
   */
  toggleSection = (section: string) => {
    this.setState(prevState => ({
      expandedSections: {
        ...prevState.expandedSections,
        [section]: !prevState.expandedSections[section]
      }
    }));
  };

  /**
   * Render audio recording section
   */
  renderAudioSection() {
    const audio = this.props.value?.audio || {};
    
    return (
      <div className="decap-widget-media-section">
        <h4 className="section-title">Audio Recording</h4>
        
        <div className="field-group">
          <label htmlFor="audio-title">Title</label>
          <input
            id="audio-title"
            type="text"
            value={audio.title || ''}
            onChange={(e) => this.updateAudio({ title: e.target.value })}
            placeholder="Episode narration, Author reading, etc."
          />
        </div>

        <div className="field-group">
          <label htmlFor="audio-url">Audio URL</label>
          <input
            id="audio-url"
            type="url"
            value={audio.url || ''}
            onChange={(e) => this.updateAudio({ url: e.target.value })}
            placeholder="https://example.com/audio.mp3"
          />
        </div>

        <div className="field-group">
          <label htmlFor="audio-duration">Duration (seconds)</label>
          <input
            id="audio-duration"
            type="number"
            value={audio.duration_seconds || ''}
            onChange={(e) => this.updateAudio({ duration_seconds: parseInt(e.target.value) })}
            placeholder="180"
          />
        </div>

        <div className="field-group">
          <label htmlFor="audio-transcript">Transcript URL</label>
          <input
            id="audio-transcript"
            type="url"
            value={audio.transcript_url || ''}
            onChange={(e) => this.updateAudio({ transcript_url: e.target.value })}
            placeholder="https://example.com/transcript.txt"
          />
        </div>

        {/* Google Drive Integration */}
        <details className="google-drive-section">
          <summary>Google Drive Integration</summary>
          <div className="field-group">
            <label htmlFor="drive-file-id">File ID</label>
            <input
              id="drive-file-id"
              type="text"
              value={audio.google_drive?.file_id || ''}
              onChange={(e) => this.updateAudio({ 
                google_drive: { ...audio.google_drive, file_id: e.target.value }
              })}
              placeholder="1a2b3c4d5e..."
            />
          </div>
        </details>
      </div>
    );
  }

  /**
   * Render videos section
   */
  renderVideosSection() {
    const videos = this.props.value?.videos || [];
    
    return (
      <div className="decap-widget-media-section">
        <div className="section-header">
          <h4 className="section-title">Videos ({videos.length})</h4>
          <button 
            type="button"
            onClick={this.addVideo}
            className="add-button"
          >
            + Add Video
          </button>
        </div>

        {videos.map((video, index) => (
          <div key={index} className="media-item">
            <div className="item-header">
              <span className="item-number">Video #{index + 1}</span>
              <button
                type="button"
                onClick={() => this.removeVideo(index)}
                className="remove-button"
              >
                Remove
              </button>
            </div>

            <div className="field-group">
              <label>Title</label>
              <input
                type="text"
                value={video.title || ''}
                onChange={(e) => this.updateVideo(index, { title: e.target.value })}
                placeholder="Video title"
              />
            </div>

            <div className="field-group">
              <label htmlFor={`video-platform-${index}`}>Platform</label>
              <select
                id={`video-platform-${index}`}
                value={video.platform || 'YouTube'}
                onChange={(e) => this.updateVideo(index, { 
                  platform: e.target.value as 'YouTube' | 'Vimeo' | 'Custom' 
                })}
              >
                <option value="YouTube">YouTube</option>
                <option value="Vimeo">Vimeo</option>
                <option value="Custom">Custom</option>
              </select>
            </div>

            <div className="field-group">
              <label>URL</label>
              <input
                type="url"
                value={video.url || ''}
                onChange={(e) => this.updateVideo(index, { url: e.target.value })}
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>

            <div className="field-group">
              <label>Thumbnail URL</label>
              <input
                type="url"
                value={video.thumbnail_url || ''}
                onChange={(e) => this.updateVideo(index, { thumbnail_url: e.target.value })}
                placeholder="https://example.com/thumbnail.jpg"
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  /**
   * Render code snippets section
   */
  renderCodeSection() {
    const snippets = this.props.value?.code_snippets || [];
    const languages = ['javascript', 'typescript', 'python', 'rust', 'go', 'java', 'cpp', 'css', 'html', 'yaml', 'json', 'bash', 'sql'];
    
    return (
      <div className="decap-widget-media-section">
        <div className="section-header">
          <h4 className="section-title">Code Snippets ({snippets.length})</h4>
          <button 
            type="button"
            onClick={this.addCodeSnippet}
            className="add-button"
          >
            + Add Code Snippet
          </button>
        </div>

        {snippets.map((snippet, index) => (
          <div key={index} className="media-item">
            <div className="item-header">
              <span className="item-number">Snippet #{index + 1}</span>
              <button
                type="button"
                onClick={() => this.removeCodeSnippet(index)}
                className="remove-button"
              >
                Remove
              </button>
            </div>

            <div className="field-group">
              <label>Title</label>
              <input
                type="text"
                value={snippet.title || ''}
                onChange={(e) => this.updateCodeSnippet(index, { title: e.target.value })}
                placeholder="Code snippet title"
              />
            </div>

            <div className="field-group">
              <label htmlFor={`snippet-language-${index}`}>Language</label>
              <select
                id={`snippet-language-${index}`}
                value={snippet.language || 'javascript'}
                onChange={(e) => this.updateCodeSnippet(index, { language: e.target.value })}
              >
                {languages.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            <div className="field-group">
              <label>Gist URL (optional)</label>
              <input
                type="url"
                value={snippet.gist_url || ''}
                onChange={(e) => this.updateCodeSnippet(index, { gist_url: e.target.value })}
                placeholder="https://gist.github.com/..."
              />
            </div>

            <div className="field-group">
              <label>Code</label>
              <textarea
                value={snippet.code || ''}
                onChange={(e) => this.updateCodeSnippet(index, { code: e.target.value })}
                placeholder="// Your code here"
                rows={10}
                className="code-textarea"
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  /**
   * Render diagrams section
   */
  renderDiagramsSection() {
    const diagrams = this.props.value?.diagrams || [];
    
    return (
      <div className="decap-widget-media-section">
        <div className="section-header">
          <h4 className="section-title">Diagrams ({diagrams.length})</h4>
          <button 
            type="button"
            onClick={this.addDiagram}
            className="add-button"
          >
            + Add Diagram
          </button>
        </div>

        {diagrams.map((diagram, index) => (
          <div key={index} className="media-item">
            <div className="item-header">
              <span className="item-number">Diagram #{index + 1}</span>
              <button
                type="button"
                onClick={() => this.removeDiagram(index)}
                className="remove-button"
              >
                Remove
              </button>
            </div>

            <div className="field-group">
              <label>Title</label>
              <input
                type="text"
                value={diagram.title || ''}
                onChange={(e) => this.updateDiagram(index, { title: e.target.value })}
                placeholder="Diagram title"
              />
            </div>

            <div className="field-group">
              <label htmlFor={`diagram-type-${index}`}>Type</label>
              <select
                id={`diagram-type-${index}`}
                value={diagram.type || 'Mermaid'}
                onChange={(e) => this.updateDiagram(index, { 
                  type: e.target.value as 'Mermaid' | 'GraphViz' | 'PlantUML' | 'Image' 
                })}
              >
                <option value="Mermaid">Mermaid</option>
                <option value="GraphViz">GraphViz</option>
                <option value="PlantUML">PlantUML</option>
                <option value="Image">Image</option>
              </select>
            </div>

            {diagram.type !== 'Image' ? (
              <div className="field-group">
                <label>Source Code</label>
                <textarea
                  value={diagram.source || ''}
                  onChange={(e) => this.updateDiagram(index, { source: e.target.value })}
                  placeholder={diagram.type === 'Mermaid' ? 'graph TD\n  A --> B' : 'Diagram source code'}
                  rows={10}
                  className="code-textarea"
                />
              </div>
            ) : (
              <div className="field-group">
                <label>Image URL</label>
                <input
                  type="url"
                  value={diagram.rendered_url || ''}
                  onChange={(e) => this.updateDiagram(index, { rendered_url: e.target.value })}
                  placeholder="https://example.com/diagram.png"
                />
              </div>
            )}

            <div className="field-group">
              <label>Caption</label>
              <input
                type="text"
                value={diagram.caption || ''}
                onChange={(e) => this.updateDiagram(index, { caption: e.target.value })}
                placeholder="Diagram caption"
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  /**
   * Main render method
   */
  render() {
    const { activeTab } = this.state;
    const { value = {} } = this.props;
    
    // Count items in each section
    const counts = {
      audio: value.audio ? 1 : 0,
      videos: value.videos?.length || 0,
      code: value.code_snippets?.length || 0,
      diagrams: value.diagrams?.length || 0
    };

    return (
      <div className="decap-widget-media-attachments">
        <style>{`
          .decap-widget-media-attachments {
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 16px;
            background: #f8fafc;
          }
          
          .tab-nav {
            display: flex;
            gap: 8px;
            margin-bottom: 20px;
            border-bottom: 2px solid #e2e8f0;
          }
          
          .tab-button {
            padding: 8px 16px;
            background: none;
            border: none;
            cursor: pointer;
            font-size: 14px;
            color: #64748b;
            position: relative;
            transition: color 0.2s;
          }
          
          .tab-button.active {
            color: #0f172a;
            font-weight: 600;
          }
          
          .tab-button.active::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            right: 0;
            height: 2px;
            background: #3b82f6;
          }
          
          .tab-count {
            background: #e2e8f0;
            color: #64748b;
            padding: 2px 6px;
            border-radius: 12px;
            font-size: 12px;
            margin-left: 4px;
          }
          
          .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
          }
          
          .section-title {
            font-size: 16px;
            font-weight: 600;
            margin: 0;
          }
          
          .add-button {
            padding: 6px 12px;
            background: #3b82f6;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
          }
          
          .add-button:hover {
            background: #2563eb;
          }
          
          .media-item {
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            padding: 16px;
            margin-bottom: 12px;
          }
          
          .item-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
            padding-bottom: 12px;
            border-bottom: 1px solid #f1f5f9;
          }
          
          .item-number {
            font-weight: 600;
            color: #475569;
          }
          
          .remove-button {
            padding: 4px 8px;
            background: #ef4444;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
          }
          
          .remove-button:hover {
            background: #dc2626;
          }
          
          .field-group {
            margin-bottom: 12px;
          }
          
          .field-group label {
            display: block;
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 4px;
            color: #475569;
          }
          
          .field-group input,
          .field-group select,
          .field-group textarea {
            width: 100%;
            padding: 8px;
            border: 1px solid #e2e8f0;
            border-radius: 4px;
            font-size: 14px;
          }
          
          .field-group input:focus,
          .field-group select:focus,
          .field-group textarea:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          }
          
          .code-textarea {
            font-family: 'Monaco', 'Courier New', monospace;
            font-size: 13px;
          }
          
          .google-drive-section {
            margin-top: 16px;
            padding: 12px;
            background: #f1f5f9;
            border-radius: 4px;
          }
          
          .google-drive-section summary {
            cursor: pointer;
            font-weight: 500;
            color: #475569;
            margin-bottom: 8px;
          }
        `}</style>

        {/* Tab Navigation */}
        <div className="tab-nav">
          <button
            type="button"
            className={`tab-button ${activeTab === 'audio' ? 'active' : ''}`}
            onClick={() => this.setState({ activeTab: 'audio' })}
          >
            Audio
            {counts.audio > 0 && <span className="tab-count">{counts.audio}</span>}
          </button>
          
          <button
            type="button"
            className={`tab-button ${activeTab === 'videos' ? 'active' : ''}`}
            onClick={() => this.setState({ activeTab: 'videos' })}
          >
            Videos
            {counts.videos > 0 && <span className="tab-count">{counts.videos}</span>}
          </button>
          
          <button
            type="button"
            className={`tab-button ${activeTab === 'code' ? 'active' : ''}`}
            onClick={() => this.setState({ activeTab: 'code' })}
          >
            Code Snippets
            {counts.code > 0 && <span className="tab-count">{counts.code}</span>}
          </button>
          
          <button
            type="button"
            className={`tab-button ${activeTab === 'diagrams' ? 'active' : ''}`}
            onClick={() => this.setState({ activeTab: 'diagrams' })}
          >
            Diagrams
            {counts.diagrams > 0 && <span className="tab-count">{counts.diagrams}</span>}
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'audio' && this.renderAudioSection()}
          {activeTab === 'videos' && this.renderVideosSection()}
          {activeTab === 'code' && this.renderCodeSection()}
          {activeTab === 'diagrams' && this.renderDiagramsSection()}
        </div>

        {/* Help text */}
        {this.renderHelp()}
      </div>
    );
  }
}