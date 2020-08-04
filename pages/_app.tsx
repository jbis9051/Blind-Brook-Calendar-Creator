import type { AppProps } from 'next/app'
import '../components/index.css'


function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
}
export default App;
