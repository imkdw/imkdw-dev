import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

function truncateText(text: string, maxChars: number): string {
  if (text.length <= maxChars) return text;
  return text.slice(0, maxChars - 3) + '...';
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const rawTitle = searchParams.get('title') ?? '@imkdw-dev/blog';
  const rawDescription = searchParams.get('description') ?? '직접 제작하고 운영하는 IT 기술블로그';

  const titleMaxChars = rawTitle.length > 30 ? 45 : 32;
  const title = truncateText(rawTitle, titleMaxChars);

  const descMaxChars = rawDescription.length > 50 ? 140 : 110;
  const description = truncateText(rawDescription, descMaxChars);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#2a2f3a',
          fontFamily: 'JetBrains Mono, monospace',
        }}
      >
        <div
          style={{
            width: '1120px',
            height: '550px',
            background: '#1e2229',
            borderRadius: '16px',
            border: '2px solid #3a3f4a',
            padding: '28px 40px',
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
              backgroundImage:
                'linear-gradient(rgba(61, 184, 135, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(61, 184, 135, 0.03) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
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
              <div style={{ width: '13px', height: '13px', borderRadius: '50%', background: '#ff5f56' }} />
              <div style={{ width: '13px', height: '13px', borderRadius: '50%', background: '#ffbd2e' }} />
              <div style={{ width: '13px', height: '13px', borderRadius: '50%', background: '#27c93f' }} />
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
              <span style={{ color: '#3db887' }}>~/imkdw-dev</span>
              <span style={{ color: '#f1c40f' }}>(main)</span>
              <span style={{ color: '#56b6c2' }}>$</span>
              <div style={{ width: '10px', height: '24px', background: '#3db887', marginLeft: '6px' }} />
            </div>

            <div
              style={{
                position: 'absolute',
                top: '95px',
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, #3db887 0%, #56b6c2 50%, transparent 100%)',
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
                  fontSize: title.length > 30 ? '56px' : '76px',
                  fontWeight: 700,
                  color: '#3db887',
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
                  fontSize: description.length > 50 ? '24px' : '30px',
                  color: '#a0a8b5',
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
                color: '#3db887',
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
      width: 1200,
      height: 630,
    }
  );
}
