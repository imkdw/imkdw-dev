import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

const DEFAULT_TITLE = process.env.NEXT_PUBLIC_BLOG_TITLE ?? '@imkdw-dev/blog';
const DEFAULT_DESCRIPTION = process.env.NEXT_PUBLIC_BLOG_DESCRIPTION ?? 'A tech blog I develop and operate myself';

const OG_CONFIG = {
  image: {
    width: 1200,
    height: 630,
  },
  card: {
    width: 1120,
    height: 550,
    borderRadius: 16,
    padding: { vertical: 28, horizontal: 40 },
  },
  grid: {
    size: 50,
    opacity: 0.03,
  },
  windowButton: {
    size: 13,
  },
  title: {
    longThreshold: 30,
    maxCharsLong: 45,
    maxCharsShort: 32,
    fontSizeLong: 56,
    fontSizeShort: 76,
  },
  description: {
    longThreshold: 50,
    maxCharsLong: 140,
    maxCharsShort: 110,
    fontSizeLong: 24,
    fontSizeShort: 30,
  },
  colors: {
    background: '#2a2f3a',
    cardBackground: '#1e2229',
    border: '#3a3f4a',
    primary: '#3db887',
    secondary: '#56b6c2',
    yellow: '#f1c40f',
    text: '#a0a8b5',
    closeButton: '#ff5f56',
    minimizeButton: '#ffbd2e',
    maximizeButton: '#27c93f',
  },
} as const;

function truncateText(text: string, maxChars: number): string {
  if (text.length <= maxChars) return text;
  return text.slice(0, maxChars - 3) + '...';
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const rawTitle = searchParams.get('title') ?? DEFAULT_TITLE;
    const rawDescription = searchParams.get('description') ?? DEFAULT_DESCRIPTION;

    const isLongTitle = rawTitle.length > OG_CONFIG.title.longThreshold;
    const titleMaxChars = isLongTitle ? OG_CONFIG.title.maxCharsLong : OG_CONFIG.title.maxCharsShort;
    const title = truncateText(rawTitle, titleMaxChars);

    const isLongDescription = rawDescription.length > OG_CONFIG.description.longThreshold;
    const descMaxChars = isLongDescription ? OG_CONFIG.description.maxCharsLong : OG_CONFIG.description.maxCharsShort;
    const description = truncateText(rawDescription, descMaxChars);

    const titleFontSize = isLongTitle ? OG_CONFIG.title.fontSizeLong : OG_CONFIG.title.fontSizeShort;
    const descFontSize = isLongDescription ? OG_CONFIG.description.fontSizeLong : OG_CONFIG.description.fontSizeShort;

    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: OG_CONFIG.colors.background,
            fontFamily: 'JetBrains Mono, monospace',
          }}
        >
          <div
            style={{
              width: `${OG_CONFIG.card.width}px`,
              height: `${OG_CONFIG.card.height}px`,
              background: OG_CONFIG.colors.cardBackground,
              borderRadius: `${OG_CONFIG.card.borderRadius}px`,
              border: `2px solid ${OG_CONFIG.colors.border}`,
              padding: `${OG_CONFIG.card.padding.vertical}px ${OG_CONFIG.card.padding.horizontal}px`,
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `linear-gradient(rgba(61, 184, 135, ${OG_CONFIG.grid.opacity}) 1px, transparent 1px), linear-gradient(90deg, rgba(61, 184, 135, ${OG_CONFIG.grid.opacity}) 1px, transparent 1px)`,
                backgroundSize: `${OG_CONFIG.grid.size}px ${OG_CONFIG.grid.size}px`,
              }}
            />

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  marginBottom: '36px',
                }}
              >
                <div
                  style={{
                    width: `${OG_CONFIG.windowButton.size}px`,
                    height: `${OG_CONFIG.windowButton.size}px`,
                    borderRadius: '50%',
                    background: OG_CONFIG.colors.closeButton,
                  }}
                />
                <div
                  style={{
                    width: `${OG_CONFIG.windowButton.size}px`,
                    height: `${OG_CONFIG.windowButton.size}px`,
                    borderRadius: '50%',
                    background: OG_CONFIG.colors.minimizeButton,
                  }}
                />
                <div
                  style={{
                    width: `${OG_CONFIG.windowButton.size}px`,
                    height: `${OG_CONFIG.windowButton.size}px`,
                    borderRadius: '50%',
                    background: OG_CONFIG.colors.maximizeButton,
                  }}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  fontSize: '20px',
                  fontWeight: 500,
                  marginBottom: '40px',
                  gap: '8px',
                }}
              >
                <span style={{ color: OG_CONFIG.colors.primary }}>~/imkdw-dev</span>
                <span style={{ color: OG_CONFIG.colors.yellow }}>(main)</span>
                <span style={{ color: OG_CONFIG.colors.secondary }}>$</span>
                <div style={{ width: '10px', height: '24px', background: OG_CONFIG.colors.primary, marginLeft: '6px' }} />
              </div>

              <div
                style={{
                  position: 'absolute',
                  top: '95px',
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: `linear-gradient(90deg, ${OG_CONFIG.colors.primary} 0%, ${OG_CONFIG.colors.secondary} 50%, transparent 100%)`,
                  opacity: 0.4,
                }}
              />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: '80px',
                }}
              >
                <div
                  style={{
                    fontSize: `${titleFontSize}px`,
                    fontWeight: 700,
                    color: OG_CONFIG.colors.primary,
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    marginBottom: '40px',
                    display: 'flex',
                    flexWrap: 'wrap',
                  }}
                >
                  {title}
                </div>
                <div
                  style={{
                    fontSize: `${descFontSize}px`,
                    color: OG_CONFIG.colors.text,
                    fontWeight: 400,
                    lineHeight: 1.5,
                    display: 'flex',
                    flexWrap: 'wrap',
                  }}
                >
                  {description}
                </div>
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: '50px',
                  right: '50px',
                  fontSize: '140px',
                  color: OG_CONFIG.colors.primary,
                  opacity: 0.12,
                  fontWeight: 700,
                }}
              >
                &lt;/&gt;
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: OG_CONFIG.image.width,
        height: OG_CONFIG.image.height,
      }
    );
  } catch {
    return new Response('Internal Server Error', { status: 500 });
  }
}
