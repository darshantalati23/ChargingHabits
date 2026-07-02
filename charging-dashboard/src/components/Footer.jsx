export default function Footer() {
  return (
    <footer style={{
      background: 'var(--bg-surface)',
      borderTop: '1px solid var(--border-subtle)',
      padding: '28px 28px 32px',
      marginTop: 0,
    }}>
      {/* Celebration Banner */}
      <div className="celebration-banner-container">
        <a
          href="https://www.linkedin.com/posts/dkt-ekantik_ieee-researchpaper-sustainability-ugcPost-7478332409852383232-FPW4" // TODO: Replace with your actual publication URL later
          target="_blank"
          rel="noopener noreferrer"
          className="celebration-banner"
        >
          <span>
            Paper Accepted for Publication at <strong style={{ color: 'var(--text-accent)', fontWeight: 600 }}>IEEE CICON 2026</strong>
          </span>
          <span className="arrow" style={{ fontSize: '11px', opacity: 0.8 }}>→</span>
        </a>
      </div>

      {/* Credits */}
      <div style={{ textAlign: 'center' }}>
        <p style={{ margin: '0 0 8px', fontSize: 13, color: 'var(--text-secondary)' }}>
          Research Supervisor:{' '}
          <a
            href="https://www.linkedin.com/in/prof-dr-anupam-rana-28017a18/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover-underline-anim"
            style={{ color: 'var(--accent-blue)', fontWeight: 600 }}
          >
            Prof. (Dr.) Anupam Rana
          </a>
        </p>
        <p style={{ margin: '0 0 8px', fontSize: 13, color: 'var(--text-secondary)' }}>
          Made with{' '}
          <span style={{ color: '#f43f5e' }}>❤</span>
          {' '}by{' '}
          <a
            href="https://www.linkedin.com/in/dkt-ekantik/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover-underline-anim"
            style={{ color: 'var(--accent-blue)', fontWeight: 600 }}
          >
            Darshan Talati
          </a>
        </p>
        <p style={{ margin: 0, fontSize: 12, color: 'var(--text-muted)' }}>
          Special thanks to researchers:{' '}
          <a
            href="https://www.linkedin.com/in/dharmesh-upadhyay-470493354/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover-underline-anim"
            style={{ color: 'var(--text-secondary)' }}
          >
            Dharmesh Upadhyay
          </a>
          <span style={{ color: 'var(--text-muted)', margin: '0 6px' }}>·</span>
          <a
            href="https://www.linkedin.com/in/sahil-abbas-765b9531b/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover-underline-anim"
            style={{ color: 'var(--text-secondary)' }}
          >
            Sahil Abbas
          </a>
        </p>
        
        {/* About This Project */}
      <p style={{
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: 12,
        margin: '10px 0 0',
        lineHeight: 1.7,
      }}>
        Built on 222 anonymous survey responses
      </p>
        
      </div>
    </footer>
  );
}
