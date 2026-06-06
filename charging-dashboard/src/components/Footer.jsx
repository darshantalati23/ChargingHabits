export default function Footer() {
  return (
    <footer style={{
      background: 'var(--bg-surface)',
      borderTop: '1px solid var(--border-subtle)',
      padding: '28px 28px 32px',
      marginTop: 0,
    }}>
      {/* About This Project */}
      <p style={{
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: 12,
        margin: '0 0 20px',
        lineHeight: 1.7,
      }}>
        Built on 221 anonymous survey responses&nbsp;&nbsp;|&nbsp;&nbsp;
        Python · pandas · scikit-learn · Gemini Vision API · React · Recharts
      </p>

      <div style={{ borderTop: '1px solid var(--border-subtle)', marginBottom: 20 }} />

      {/* Credits */}
      <div style={{ textAlign: 'center' }}>
        <p style={{ margin: '0 0 8px', fontSize: 13, color: 'var(--text-secondary)' }}>
          Made with{' '}
          <span style={{ color: '#f43f5e' }}>❤</span>
          {' '}by{' '}
          {/* TODO: replace href with your GitHub profile URL */}
          <a
            href="https://www.linkedin.com/in/dkt-ekantik/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--accent-blue)', textDecoration: 'none', fontWeight: 600 }}
          >
            Darshan Talati
          </a>
        </p>
        <p style={{ margin: 0, fontSize: 12, color: 'var(--text-muted)' }}>
          Special thanks to researchers:{' '}
          {/* TODO: replace href with Dharmesh Upadhyay's GitHub profile URL */}
          <a
            href="https://www.linkedin.com/in/dharmesh-upadhyay-470493354/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--text-secondary)', textDecoration: 'none', borderBottom: '1px solid var(--border-active)' }}
          >
            Dharmesh Upadhyay
          </a>
          <span style={{ color: 'var(--text-muted)', margin: '0 6px' }}>·</span>
          {/* TODO: replace href with Sahil Abbas's GitHub profile URL */}
          <a
            href="https://www.linkedin.com/in/sahil-abbas-765b9531b/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--text-secondary)', textDecoration: 'none', borderBottom: '1px solid var(--border-active)' }}
          >
            Sahil Abbas
          </a>
        </p>
      </div>
    </footer>
  );
}
