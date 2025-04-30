const MessageBubble = ({ message, isOwn }) => (
    <div
        style={{
            display: 'flex',
            justifyContent: isOwn ? 'flex-end' : 'flex-start',
            margin: '10px 0',
        }}
    >
        <span
            style={{
                maxWidth: '60%',
                padding: '10px',
                borderRadius: '15px',
                background: isOwn ? '#dcf8c6' : '#f1f0f0',
                color: '#000',
                wordWrap: 'break-word',
                textAlign: 'left',
            }}
        >
            {message.content}
        </span>
    </div>
);

export default MessageBubble;
