import{ useEffect, useState } from 'react'

const TypingMessage = ({ text }: { text: string }) => {
    const [display,setDisplay] = useState("");

    useEffect(()=>{
        let i=0;
        const interval = setInterval(()=>{
            i++;
            setDisplay(text.slice(0,i));
            

            if(i > text.length) clearInterval(interval)
        },15);

        return ()=>clearInterval(interval);
    },[text]);
  return (
   <div>
    {display}
    <span className="animate-pulse">|</span>
  </div>
  )
}

export default TypingMessage