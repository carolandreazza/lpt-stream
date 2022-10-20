import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import React, { useEffect, useState } from "react";


export default function Home() {
  /*variável de estado para armazenar a carteira pública do usuário.*/
  const [currentAccount, setCurrentAccount] = useState(null);

  /*Já que esse método vai levar um tempo, é declarádo como async*/
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Eu acho que você não tem a metamask!");
        return;
      } else {
        console.log("Nós temos o objeto ethereum", ethereum);

        /* Checa se estamos autorizados a acessar a carteira do usuário.*/
        const accounts = await ethereum.request({ method: "eth_accounts" });

        /*Usuário pode ter múltiplas contas autorizadas, pegamos a primeira se estiver ali!*/
        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log("Carteira conectada::", account);
          setCurrentAccount(account);
        } else {
          console.log("Não encontramos uma carteira conectada");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWalletAction = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Instale a MetaMask!");
        return;
      }

      /*Método para pedir acesso para a conta.*/
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      /*Escreve o endereço público uma vez que autorizarmos Metamask.*/
      console.log("Contectado", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Livepeer Sample App</title>
        <meta name='description' content='Livepeer Studio Sample App' />
        {/* <link rel='icon' href='/favicon.ico' /> */}
        <link rel='icon' href='/logo.png' />
      </Head>
      <main className={styles.main}>
        <h2 className={styles.h2}>
          <Link href='https://livepeer.studio'>LPT Studio! 🎥 </Link>
        </h2>
        <div className="connect-wallet-container">
            <br/>
            <button className="text-blue-500  hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-md font-mediumn" 
                    onClick={connectWalletAction}>
              Conectar carteira
            </button>
            <br/>
        </div>

        <div className={styles.grid}> 
          
          {/* <Link href='livestream'>
            <a className={styles.card}>
              <h2>LiveStream &rarr;</h2>
              <p>Learn all about Livepeer Studio&apos;s Livestream</p>
            </a>
          </Link>

          <Link href='livestreamSDK'>
            <a className={styles.card}>
              <h2>LiveStreamSDK &rarr;</h2>
              <p>Learn all about Livestreams with the SDK</p>
            </a>
          </Link>

          <Link href='onDemand/'>
            <a className={styles.card}>
              <h2>On Demand &rarr;</h2>
              <p>Learn all about uploading, updating and deleting assets</p>
            </a>
          </Link>

          <Link href='onDemandSDK/'>
            <a className={styles.card}>
              <h2>On Demand SDK &rarr;</h2>
              <p>Learn all about On Demand with the SDK</p>
            </a>
          </Link>
           */}
          
          <Link href='videoPlayer'>
            <a className={styles.card}>
              <h2>🎥 Live 1 &rarr;</h2>
              {/* <p> Live 1</p> */}
            </a>
          </Link>

          <Link href='videoPlayer'>
            <a className={styles.card}>
              <h2>🎥 Live 2 &rarr;</h2>
            </a>
          </Link>
          
          <Link href='videoPlayer'>
            <a className={styles.card}>
              <h2>🎥 Live 3 &rarr;</h2>
            </a>
          </Link>

          <Link href='videoPlayer'>
            <a className={styles.card}>
              <h2>🎥 Live 4 &rarr;</h2>
            </a>
          </Link>

          
          <Link href='onDemand/'>
            <a className={styles.card}>
              <h2>Sob Demanda &rarr;</h2>
              <p>Vídeo hospedado</p>
            </a>
          </Link>

        </div>
       
      </main>
    </div>
  );
}