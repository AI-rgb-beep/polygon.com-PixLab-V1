# polygon.com PixLab V1

## Overview

**polygon.com PixLab V1** is an AI-powered video generation tool designed specifically for Polygon articles. This application enables content creators to generate custom videos based on text prompts, automatically post them to specified article links, and download generated content for offline use.

### Key Features

- 🎬 **AI Video Generation** - Generate unique videos from text prompts using our trained model
- 🔗 **Article Integration** - Automatically post generated videos to your Polygon article URLs
- 📥 **Download Support** - Download generated videos locally for backup or manual distribution
- 🎯 **Simple Two-Step Workflow** - Easy article URL entry followed by prompt-based generation
- ✈️ **Paper Airplane Submission** - Intuitive paper airplane icon for submitting generation requests

### How to Use

1. **Enter Article URL** - Paste the link to your Polygon article where you want the video posted
2. **Create Your Prompt** - Describe the video content you want to generate in natural language
3. **Generate** - Click the paper airplane icon (✈️) to start video generation
4. **Download or Post** - Download your video locally or automatically post it to your article

### Training Data

This model is trained on unfiltered videos from [https://static0.polygonimages.com/](https://static0.polygonimages.com/), ensuring videos are tailored to Polygon's content style and quality standards.

### API Endpoints

#### Generate Video
- **Endpoint**: `POST /api/generate-video`
- **Parameters**:
  - `prompt` (string): Description of the video to generate
  - `articleLink` (string): Target article URL
- **Response**: Generated video URL

#### Post to Article
- **Endpoint**: `POST /api/post-to-article`
- **Parameters**:
  - `articleLink` (string): Article URL
  - `videoUrl` (string): Generated video URL
  - `prompt` (string): Original prompt used
  - `timestamp` (string): ISO timestamp
- **Response**: Confirmation with article reference

### Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Video Processing**: Canvas API (with server-side generation support)
- **Deployment**: GitHub Pages
- **Integration**: RESTful API for video generation and article posting

### Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

### Future Enhancements

- [ ] Real-time video preview while generating
- [ ] Multiple video style options
- [ ] Batch processing for multiple articles
- [ ] Video editing tools
- [ ] Analytics dashboard
- [ ] Social media cross-posting

### License

This project is part of the Polygon media platform and is maintained by the PixLab team.

### Support

For issues, feature requests, or support, please visit our GitHub repository or contact the PixLab development team.

---

**Built with ❤️ for Polygon.com**
