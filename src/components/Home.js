import { Button} from "react-bootstrap";
import { useState  } from "react";
import myContract from '../contract.js'
import "bootstrap/dist/css/bootstrap.min.css";
import Stake from "./StakeDetails.js";
import Balance from "./Balance.js";

const Home = () => {

    const ethereum = window.ethereum;

    const [stakes, setstakes] = useState({data:null})
    const [reward, setreward] = useState({data:null})
    const [apy, setapy] = useState({data:null})
    const [block, setblock] = useState({data:null})

    //  get stake details
    const getStakeDetails = async () => {
        const r = await myContract.methods.viewStakeDetails(ethereum.selectedAddress).call()
        return r;
    }

    //  update stake details
    const updateStake = () => {  
        const r1 = Promise.resolve(getStakeDetails());
        r1.then(value => {
            setstakes({data: value}); 
        })  
    };  

    //  check rewards
    const checkRewards = async () => {
        const r = await myContract.methods.calculateRewards(ethereum.selectedAddress).call()
        return r;
    }

    // update rewards
    const updateReward = () => {  
        const p = Promise.resolve(checkRewards());
        p.then(value => {
            setreward({data: value.toString()}); 
        })  
    }; 

    //  check estimated APY
    const checkAPY = async () => {
        let amount = document.getElementById("amt").value;
        let periodInSeconds = 86400;
        const r = await myContract.methods.calculateAPY(amount, periodInSeconds).call()
        return r;
    }

    // update APY
    const updateAPY = () => {  
        const p = Promise.resolve(checkAPY());
        p.then(value => {
            console.log(value)
            let num =  Number(value) * 365
            setapy({data: num}); 
        })  
    }; 

    //  check current block number 
    const checkBlockNumber = async () => {
        const r = await myContract.methods.blockNumber().call()
        return r;
    }

    // update current block number
    const updateBlock = () => {  
        const r1 = Promise.resolve(checkBlockNumber());
        r1.then(value => {
            setblock({data: Number(value)}); 
        })  
    }; 

    //  calls stake function from the contract
    const stake = async() => {
        let amount = document.getElementById('stakecount').value;
        const result = await myContract.methods.stakeTokens(amount  ).send({from: ethereum.selectedAddress})
    }

    //  calls withdrawStake() function from the contract
    const unstake = async() => {
        const result = await myContract.methods.withdrawStake().send({from: ethereum.selectedAddress})
    }

    //  claim rewards 
    const claim = async() => {
        const result = await myContract.methods.claimRewards().send({from: ethereum.selectedAddress})
    }

    //  transfer funds  
    const transfer = async() => {
        let address = document.getElementById('taddress').value;
        let amount = document.getElementById('tamount').value;
        const result = await myContract.methods.transfer(address, amount).send({from: ethereum.selectedAddress})
    }

    return (  
        <div  >
            <div className="stake-preview">
                <h1 className="stake-details">Check Staking details</h1>
                { stakes.data && <Stake data = {stakes.data} /> }
                <Button className="card"
                    onClick={() => updateStake()}
                    >Check</Button>
                    <br />
            </div>

            <div className="stake-preview">
                <h1 className="stake-details">Stake Tokens</h1>
                <input className="input" type="number" id="stakecount" placeholder="Amount "/>
                <br /><br />    
                <Button className="card" onClick={() => stake()} >Stake </Button>
            </div>

            <div className="stake-preview">
                <h1 className="stake-details">Check Rewards</h1>
                { reward.data && <Balance data = {reward.data} /> }
                <Button className="card" onClick={() => updateReward()} >Check </Button>
            </div>

            <div className="stake-preview">
                <h1 className="stake-details">Calculate estimated APY</h1>
                <input className="input" type="number" id="amt" placeholder="Amount "/>
                <br /> <br />
                { apy.data && <Balance data = {apy.data} /> }
                <Button className="card" onClick={() => updateAPY()} >Check  </Button>
            </div>

            <div className="stake-preview">
                <h1 className="stake-details">Claim Reward</h1>
                <Button className="card" onClick={() => claim()} >Check  </Button>
            </div>

            <div className="stake-preview">
                <h1 className="stake-details">Withdraw Stake</h1>
                <Button className="card" onClick={() => unstake()} >Check  </Button>
            </div>

            <div className="stake-preview">
                <h1 className="stake-details">Check current block number</h1>
                { block.data && <Balance data = {block.data} /> }
                <Button className="card" onClick={() => updateBlock()} >Check  </Button>
            </div>

            <div className="stake-preview">
                <h1 className="stake-details">Transfer funds</h1>
                <input className="input" type="text" id="taddress" placeholder="Address "/><br /><br />
                <input className="input" type="number" id="tamount" placeholder="Amount "/><br /><br />
                <Button className="card" onClick={() => transfer()} >Send  </Button>
            </div>

        </div>
    );
}
 
export default Home;