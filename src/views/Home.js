import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Stepper from "react-stepper-horizontal/lib/Stepper";
import { getTemplate } from "../lib/datastorage";
import { getMintPrice, mintCoin } from "../lib/userAccess";
import { getCoinGrade, getCoinType } from "../lib/helpers";
import { approve } from "../lib/erc20";
import "../assets/css/Home.css";


function Home( { accountConnected} ) {
  const { id } = useParams();
  const [ templateId, setTemplateId ] = useState(0);
  const [ inputErrors, setInputErrors ] = useState("");
  const [ templateDetail, setTemplateDetail] = useState(null);
  const [ coinType, setCoinType ] = useState("");
  const [ coinGrade, setCoinGrade ] = useState("");
  const [ emojiCount, setEmojiCount ] = useState(0);
  const [ modalErrors, setModalErrors ] = useState("");
  const [ mintCoinModalVisibiltiy, setMintCoinModalVisibiltiy] = useState(false);
  const [ mintCoinStep, setMintCoinStep ] = useState(0);
  const [ mintCoinApproveBtnText, setMintCoinApproveBtnText] = useState("Approve");
  const [ mintCoinApproveBtnDisabled, setMintCoinApproveBtnDisabled] = useState(false);
  const [ mintCoinActionBtnText, setMintCoinActionBtnText] = useState("Mint");
  const [ mintCoinActionBtnDisabled, setMintCoinActionBtnDisabled] = useState(false);

  useEffect(() => {
    if (id != null) {
      setTemplateId(id);
      loadTemplate(id);
    }
  }, [accountConnected])

  function loadTemplate(templateId){
    setInputErrors("");
    setEmojiCount(0);
    getTemplate(templateId).then(data => {
      if (data != null) {
        setTemplateDetail(data);

        getCoinType(data.coinType).then(type => {
          setCoinType(type);
        });

        getCoinGrade(data.coinGrade).then(grade => {
          setCoinGrade(grade);
        });

        getMintPrice(templateId).then(coinPrice => {
          setEmojiCount(coinPrice / 1000000000000000000);
        }).catch(error => {
          setEmojiCount(0);
        });

        if (data?.coinMintCount > 0) setInputErrors("This Coin is already minted.");
      }
    }).catch(error => {
      //console.log(error);
      setTemplateDetail(null);
      setInputErrors("Failed to load Template.");
    });
  }

  function loadTemplateClick()
  {
    loadTemplate(templateId);
  }

  // Mint Coin Modal -----------------------------------------------------------------

  function mintCoinModalShow(){
    setMintCoinStep(0);
    setMintCoinApproveBtnText("Approve Emoji Burn");
    setMintCoinActionBtnText("Mint");
    setMintCoinApproveBtnDisabled(false);
    setMintCoinActionBtnDisabled(true);
    setMintCoinModalVisibiltiy(true);
    setModalErrors("");
  }

  function mintCoinApproveClick(){
    resetMintCoinModalFields();
    setMintCoinApproveBtnText("Approving...");
    setMintCoinApproveBtnDisabled(true);
    getMintPrice(templateId).then(coinPrice => {
      approve(process.env.REACT_APP_USERACCESS_ADDRESS, coinPrice).then(val => {
        if (val === "1"){
          setMintCoinStep(1);
          setMintCoinActionBtnDisabled(false);
          setMintCoinApproveBtnText("Approved");
        } else {
          setModalErrors(extractMessage(val?.message));
          setMintCoinApproveBtnDisabled(false);
          setMintCoinApproveBtnText("Approve Emoji Burn");
        }
      })
    })
  }

  async function mintCoinClick(){
    setModalErrors("");
    setMintCoinActionBtnDisabled(true);
    setMintCoinActionBtnText("Minting...");
    mintCoin(templateId).then(val => {
      if (val === "1"){
        alert("The Coin was minted successfully and shortly will arrive to your wallet! Please click 'Refresh Metadata' on Opensea gallery to see changes on Opensea.");
        setMintCoinModalVisibiltiy(false);
      } else {
        setModalErrors(extractMessage(val?.message));
      }
      setMintCoinActionBtnText("Mint");
      setMintCoinActionBtnDisabled(false);
    })
  }

  function resetMintCoinModalFields(){
    setModalErrors("");
    setMintCoinActionBtnDisabled(true);
  }  

  function extractMessage(message) {
    if (message == null) return "Failed to execute transaction.";

    let startIndex = message.indexOf('execution reverted:');
    if (startIndex > 0)
    {
      let userMessage = message.substring(startIndex + 20);
      return userMessage.substring(0, userMessage.indexOf('"'))
    }

    if (message.length > 100) return "Failed to execute transaction.";

    return message;
  }

  return (
    <>
      <div className="row my-3">
        <div className="col-md-12">
          <div className="card galery-container">
            <div className="card-body">
              <div className="row">
                <span><b>{'Enter Emoji Template Id'}</b></span>
                <div className="col-md-4">
                  <input maxLength={5} className="form-control" value={templateId != null ? templateId : 0 } onChange={event => setTemplateId(event.target.value.replace(/\D/,''))} />
                </div>
                <div className="col-md-4">
                  {
                    true ? (
                      <button type="button" className="btn btn-secondary action-btn px-4 mx-2" onClick={loadTemplateClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 19 19">
                          <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                          <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                        </svg>                             
                        Load Template
                      </button>) 
                    : <></>
                  }

                </div>
              </div>
              <span className="text-danger">{ inputErrors } </span>
              <br/>


              <div className="row">
                <div className="col-md-12 px-1">
                  <div className="row">
                    <div className="col-md-12">
                      {
                        templateDetail != null ? (
                          <div className="row px-2">
                            <div className="col-md-12"><b>Name:</b> { templateDetail?.coinName }</div>
                          </div>
                          ) 
                        : <></>                        
                      }
                      {
                        templateDetail != null ? (
                          <div className="row px-2">
                            <div className="col-md-12"><b>Coin Type:</b> { coinType }</div>
                          </div>
                          ) 
                        : <></>                        
                      }
                      {
                        templateDetail != null ? (
                          <div className="row px-2">
                            <div className="col-md-12"><b>Coin Grade:</b> { coinGrade }</div>
                          </div>     
                          ) 
                        : <></>                        
                      }
                      {
                        templateDetail?.coinMintCount > 0 ? (
                          <div className="row px-2">
                            <div className="col-md-12"><b>Minted Count:</b> { templateDetail?.coinMintCount }</div>
                          </div>                          
                          ) 
                          : <></>
                      }                             
                      {
                        emojiCount > 0 ? (
                          <div className="row px-2">
                            <div className="col-md-12"><b>Minting Price:</b> { emojiCount } Emojis</div>
                            <br/>
                            <br/>
                          </div>                                                        
                          ) 
                          : <></>
                      } 
                      <div className="row">
                        <div className="col-md-12">
                          <div className="btn-group" role="group">
                            {
                            emojiCount > 0 && accountConnected != null ? (
                              <button type="button" className="btn btn-secondary action-btn px-4 mx-2" onClick={mintCoinModalShow}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 19 19">
                                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                </svg>                                                                
                                Mint Coin
                              </button>) 
                            : <></>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>

              <Modal show={mintCoinModalVisibiltiy} onHide={() => setMintCoinModalVisibiltiy(false)} centered>
                <Modal.Header closeButton>
                  <Modal.Title>Mint Coin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <span>{'You must burn ' + emojiCount + ' Emojis to mint this coin.'}</span><br/>
                  <span className="text-danger">{modalErrors}</span>
                </Modal.Body>
                <Stepper steps={ [{title: 'Approve Emoji Burn'}, {title: 'Mint Coin'}] } activeStep={ mintCoinStep } size={32} circleFontSize={0} titleTop={4} />
                <Modal.Footer className="text-center mx-auto input-modal-footer">
                  <Button variant="secondary" onClick={mintCoinApproveClick} disabled={mintCoinApproveBtnDisabled}>
                    { mintCoinApproveBtnText }
                  </Button>
                  <Button variant="primary" disabled={mintCoinActionBtnDisabled} onClick={mintCoinClick}>
                    { mintCoinActionBtnText }
                  </Button>
                </Modal.Footer>
              </Modal> 


            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;