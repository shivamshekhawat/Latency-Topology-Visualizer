# Crypto Exchange Latency Monitor

A sophisticated Next.js application that provides real-time 3D visualization of cryptocurrency exchange server locations and latency monitoring across AWS, Google Cloud Platform, and Microsoft Azure co-location regions.

## Features

### 🌍 3D World Map Visualization
- Interactive 3D globe with smooth camera controls
- Real-time rotation and exploration capabilities
- Zoom, pan, and rotate functionality with touch support
- Starfield background for enhanced visual appeal

### 🏢 Exchange Server Locations
- Major cryptocurrency exchanges (Binance, OKX, Deribit, Bybit, Coinbase, Kraken, etc.)
- Color-coded markers for different cloud providers:
  - 🟠 AWS (Orange)
  - 🔵 Google Cloud (Blue)
  - 🔷 Microsoft Azure (Dark Blue)
- Interactive hover tooltips with detailed information
- Click-to-select functionality with enhanced visual feedback

### ⚡ Real-time Latency Visualization
- Animated connections between exchange servers
- Color-coded latency indicators:
  - 🟢 Green: Excellent (<50ms)
  - 🟡 Yellow: Good (50-100ms)
  - 🔴 Red: Poor (>100ms)
- Live data updates every 5 seconds
- Pulse effects and animated data streams

### 📊 Historical Latency Analysis
- Time-series charts with interactive controls
- Multiple time range selectors (1h, 24h, 7d, 30d)
- Statistical analysis (min, max, average latency)
- Filterable by exchange pairs
- Responsive chart design with tooltips

### ☁️ Cloud Provider Regions
- Visual representation of AWS, GCP, and Azure regions
- Region boundaries with distinct styling
- Provider-specific filtering options
- Region information display

### 🎛️ Interactive Controls
- Advanced search and filtering system
- Cloud provider toggles
- Visualization layer controls
- Exchange selection and highlighting
- Performance metrics dashboard

### 📱 Responsive Design
- Mobile-optimized 3D controls
- Touch-friendly interface
- Adaptive layout for all screen sizes
- Dark/light theme toggle

## Technology Stack

### Core Framework
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework

### 3D Visualization
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for R3F
- **Three.js** - 3D graphics library

### UI Components
- **shadcn/ui** - Modern component library
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library

### Data Visualization
- **Recharts** - Composable charting library
- **Custom hooks** - Real-time data management

## Installation & Setup

1. **Clone the repository**
\`\`\`bash
git clone <repository-url>
cd crypto-latency-dashboard
\`\`\`

2. **Install dependencies**
\`\`\`bash
npm install
\`\`\`

3. **Run the development server**
\`\`\`bash
npm run dev
\`\`\`

4. **Open your browser**
Navigate to `http://localhost:3000`

## Project Structure

\`\`\`
src/
├── app/
│   ├── components/
│   │   ├── 3d-components.tsx      # 3D visualization components
│   │   ├── control-panel.tsx      # Filter and control interface
│   │   ├── latency-chart.tsx      # Historical data charts
│   │   └── metrics-dashboard.tsx  # Performance metrics
│   ├── hooks/
│   │   ├── use-latency-data.ts    # Real-time data management
│   │   └── use-exchange-data.ts   # Exchange data filtering
│   ├── types.ts                   # TypeScript definitions
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Main application
│   └── globals.css                # Global styles
\`\`\`

## Key Components

### Globe Component
- Renders the 3D Earth with wireframe overlay
- Continuous rotation animation
- Responsive to user interactions

### Exchange Markers
- 3D spherical markers positioned using lat/lng coordinates
- Dynamic scaling and emissive effects
- Interactive tooltips with exchange information

### Latency Connections
- Animated lines connecting exchange pairs
- Color-coded based on latency values
- Real-time updates with smooth transitions

### Control Panel
- Search functionality for exchanges
- Cloud provider filtering
- Visualization toggles
- Exchange list with selection

## Data Sources & Assumptions

### Mock Data Implementation
Since this is a demonstration application, all data is simulated:

- **Exchange Locations**: Based on publicly known server locations
- **Latency Data**: Generated using realistic algorithms with sine wave patterns and random noise
- **Cloud Providers**: Assigned based on publicly available information
- **Historical Data**: Simulated time-series data with realistic patterns

### Real-world Integration
For production use, integrate with:
- **Pingdom API** - Network monitoring
- **Cloudflare Radar** - Internet insights
- **AWS CloudWatch** - Infrastructure monitoring
- **Custom monitoring solutions** - Exchange-specific APIs

## Performance Optimizations

### 3D Rendering
- Efficient geometry reuse
- Optimized material properties
- Frame rate optimization for mobile devices
- Automatic level-of-detail adjustments

### Data Management
- Efficient state management with React hooks
- Memoized calculations for filtered data
- Debounced search functionality
- Optimized re-rendering patterns

### Mobile Optimization
- Touch-friendly controls
- Responsive 3D viewport
- Adaptive UI components
- Performance monitoring

## Browser Compatibility

- **Chrome/Edge**: Full support with hardware acceleration
- **Firefox**: Full support with WebGL
- **Safari**: Full support on macOS/iOS
- **Mobile browsers**: Optimized touch controls

## Development Notes

### Adding New Exchanges
1. Update the exchange data in `use-exchange-data.ts`
2. Add geographical coordinates
3. Specify cloud provider and region
4. Update mock latency data generation

### Customizing Visualizations
1. Modify 3D components in `3d-components.tsx`
2. Adjust colors and materials
3. Add new animation effects
4. Implement custom shaders if needed

### Extending Data Sources
1. Create new data hooks
2. Implement API integration
3. Add error handling and loading states
4. Update TypeScript definitions

## Future Enhancements

### Planned Features
- **Network Topology Visualization** - Connection path mapping
- **Trading Volume Overlay** - Real-time volume data
- **Latency Heatmaps** - Surface-level visualization
- **Alert System** - Threshold-based notifications
- **Export Functionality** - Report generation
- **WebSocket Integration** - True real-time updates

### Performance Improvements
- **WebGL Shaders** - Custom rendering effects
- **Data Streaming** - Efficient real-time updates
- **Caching Layer** - Improved data management
- **Progressive Loading** - Enhanced initial load times

## Contributing

1. Fork the repository
2. Create a feature branch
3. Implement your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- **Three.js Community** - 3D visualization inspiration
- **React Three Fiber** - Excellent React integration
- **shadcn/ui** - Beautiful component library
- **Cryptocurrency Exchanges** - Public API documentation
- **Cloud Providers** - Infrastructure documentation
