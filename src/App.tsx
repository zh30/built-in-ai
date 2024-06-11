import { useCallback, useEffect, useMemo, useState } from 'react'
import { Textarea } from './components/ui/textarea'
import { Button } from './components/ui/button'
import manImage from '/android-chrome-192x192.png'
import { toast } from 'sonner';
import { marked } from "marked";

type ChatUIProps = {
  prompt: string;
  id: string;
}
const ChatUI = ({ id, prompt }: ChatUIProps) => {
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState('');
  const [time, setTime] = useState('')
  const formattedTime = () => {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const meridiem = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;

    return `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${meridiem}`;
  }
  const handleFetch = useCallback(async () => {
    try {
      setLoading(true);
      setTime(formattedTime());
      const session = await window.ai.createTextSession();
      const stream = session.promptStreaming(prompt);
      for await (const chunk of stream) {
        setAnswer(chunk);
      }
      session.destroy();
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  }, [prompt])

  useEffect(() => {
    handleFetch()
  }, [handleFetch])
  const htmlflow = useMemo(() => ({ __html: marked.parse(answer || '...') }), [answer]);

  return (
    <div className='space-y-2' key={id}>
      <div className='text-right'>
        <div className='overflow-hidden relative max-w-sm bg-white shadow-lg ring-1 ring-black/5 rounded-xl inline-flex items-center gap-6 dark:bg-slate-800 dark:highlight-white/5'>
          <img src={manImage} className='absolute -right-6 w-24 h-24 rounded-full shadow-lg' />
          <div className='flex flex-col w-full py-5 pl-5 pr-24 text-right'>
            <strong className='text-slate-900 text-base font-medium dark:text-slate-200'>{prompt}</strong>
            <span className='text-slate-500 text-sm font-medium dark:text-slate-400'>{time}</span>
          </div>
        </div>
      </div>
      <div className=''>
        <div className='overflow-hidden relative max-w-2xl min-h-20 bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg ring-1 ring-black/5 rounded-xl inline-flex items-center gap-6 dark:bg-slate-800 dark:highlight-white/5'>
          <div className='flex flex-col w-full p-5'>
            <p className='markdown prose text-white w-full break-words dark:prose-invert dark' dangerouslySetInnerHTML={htmlflow}></p>
          </div>
        </div>
      </div>
    </div>
  )
}
function App() {
  const [canCreate, setCanCreate] = useState(false);
  const [notSupproted, setNotSupported] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatList, setChatList] = useState<ChatUIProps[]>([]);
  const handleSend = useCallback(async () => {
    if (prompt.trim().length < 1) {
      toast.info("Please enter a prompt");

      return;
    }
    setLoading(true);
    const id = crypto.randomUUID()
    setChatList(o => ([
      {
        id,
        prompt,
      },
      ...o
    ]))
    setLoading(false);
    setPrompt('');
  }, [prompt]);
  const checkCanCreate = useCallback(async () => {
    const canCreate = await window?.ai?.canCreateGenericSession();

    if (!canCreate) {
      setNotSupported(true);
    }
    setCanCreate(!!canCreate);
  }, []);

  useEffect(() => {
    checkCanCreate();
  }, [checkCanCreate])

  return (
    <div className='flex flex-col w-full max-w-3xl mx-auto'>
      <h1 className='text-center text-4xl font-bold mb-4'>Gen AI</h1>
      <div className="grid w-full gap-2">
        <Textarea
          placeholder="Type your message here."
          value={prompt}
          disabled={!canCreate}
          onKeyDown={(e) => {
            const { key } = e;

            if (key === 'Enter' && !loading) {
              e.preventDefault()
              handleSend()
            }
          }}
          onChange={({ target: { value } }) => setPrompt(value)}
        />
        <Button onClick={handleSend} disabled={!canCreate || loading}>{loading ? 'loading...' : 'Send message'}</Button>
      </div>
      <div className='pt-4'>
        {notSupproted && <div className='text-center space-y-2'>
          <h2 className='text-2xl font-bold text-red-500'>Browser not supported</h2>
          <p>1, Please use Chrome Canary, <a className='ml-2 text-gray-500' target="_blank" href='https://www.google.com/chrome/canary'>click here to download</a></p>
          <p>2, Go `chrome://flags/#optimization-guide-on-device-model`, set `Enable BypassPerfRequirment` ( No `Enable`)</p>
          <p>3, Go `chrome://flags/#prompt-api-for-gemini-nano`, set `Enable`</p>
          <p>4, Go `chrome://components/`, check `Optimization Guide On Device Model`, click `Check for update`, wait for the download to complete</p>
          <p>5, Refresh this page, the unsupported reminder will no longer appear, and the text input box can be typed, then it can run</p>
        </div>}
        <div className='space-y-6'>
          {chatList.map(({ id, prompt }) => (
            <ChatUI id={id} prompt={prompt} key={id} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
