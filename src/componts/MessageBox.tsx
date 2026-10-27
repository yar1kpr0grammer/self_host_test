interface MessageBoxProps {
  message: string
}

function Toast({ message }: MessageBoxProps) {
  return <div style={{position: "absolute", bottom: "5px", right: "5px", border: "1px solid black", padding: "10px"}}>{message}</div>
}

export default Toast
