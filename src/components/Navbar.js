import myContract from '../contract.js'
import Balance from './Balance.js'
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { Button} from "react-bootstrap";
import Web3 from 'web3';

const Navbar = () => {

  const ethereum = window.ethereum;
  const [state, setstate] = useState({data:null})
  const [balance, setBalance] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    // Function to update the connected account
    const updateAccount = async () => {
      try {
        // Check if the Metamask extension is installed
        if (window.ethereum) {
          // Create a web3 instance with the Metamask provider
          const web3 = new Web3(window.ethereum);

          // Get the connected account address
          const accounts = await web3.eth.getAccounts();
          const connectedAccount = accounts[0];

          setAccount(connectedAccount);
        } else {
          setAccount(null);
        }
      } catch (error) {
        console.error('Error updating account:', error);
      }
    };

    // Call the updateAccount function initially to get the initial account
    updateAccount();

    // Listen for the accountsChanged event from Metamask using web3.js
    window.ethereum.on('accountsChanged', updateAccount);

    // Clean up the event listener on unmount
    return () => {
      // Remove the accountsChanged event listener
      window.ethereum.removeAllListeners('accountsChanged');
    };
  }, []);

  // function to get the metamask wallet balance
  const getWalletBalance = async () => {
      if (window.ethereum) {
        // Connect to Metamask
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        // Get the balance of the wallet address
        const balance = await provider.getBalance(ethereum.selectedAddress);
        const balanceInEth = ethers.utils.formatEther(balance);

        setBalance(balanceInEth);
      } 
    };

  // function to check token balance
  const getBalance = async () => {
    const r = await myContract.methods.balanceOf(ethereum.selectedAddress).call()
    return r;
  }

  // function to update token balance using useState
  const changeState1 = () => {  
    const p = Promise.resolve(getBalance());
      p.then(value => {
      setstate({data: value.toString()}); 
    })  
  };  


  return ( 
    <nav className="navbar">
    <h1>Staking App</h1>
    <div className="links">
            {account ? (
              <Button>Connected Account: {account}</Button>
            ) : (
              <Button onClick={() => window.ethereum.request({ method: 'eth_requestAccounts' })}>
                Connect Metamask
              </Button>
            )}
            <Button onClick={() => changeState1()}>Check Token Balance </Button>
            { state.data && <Balance data = {state.data}/> }
            <Button onClick={() => getWalletBalance()}>Check Wallet Balance</Button>
            { balance && <Balance data = {balance} /> }
    </div>
  </nav>
  );
}
 
export default Navbar;