import logo from './logo.svg';
import './App.css';
import { Typography, Box, TextField, Button, Alert, Select, MenuItem, Chip, Divider, Link as LinkMUI, CircularProgress} from '@mui/material';
import { useEffect, useState, } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
import colors from "./colors";
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { maxWidth } from '@mui/system';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


const getCallBackURL = () => {
  return window.location.origin + "/login"
}

const startEmailSession = async (email) => {
  console.log(email)
  const callbackURL = getCallBackURL()
  const url = `https://api.wisetribe.digital/api/email-session?email=${email}&callback_url=${callbackURL}`
  const response = await fetch(url, {
    method: "POST"
  })
  const body = await response.json()
  return body
}

const authEmailSession = async (sessionUUID) => {
  const url = `https://api.wisetribe.digital/api/auth-email-session?session_uuid=${sessionUUID}`
  const response = await fetch(url, {
    method: "POST"
  })
  const body = await response.json()
  return body
}

const verifyAuth = async (token) => {
  const url = `https://api.wisetribe.digital/api/auth/verify`
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: token
    }
  })
  const body = await response.json()
  return body
}

function FAQ() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div style={{}}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          style={{
            backgroundColor: colors.GREY_LIGHT,
            color: colors.GREY_LIGHT_FONT,
          }}
        >
          <Typography sx={{ width: '100%', flexShrink: 0 }}>
            How much do I get from the Faucet?
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          style={{
            backgroundColor: colors.GREY_LIGHT,
            color: colors.GREY_LIGHT_FONT,
          }}
        >
          <Typography>
            Currently the faucet gives out 1000 PAW per day. The amount of NANO or BANANO varies depending on the conversion rate.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
          style={{
            backgroundColor: colors.GREY_LIGHT,
            color: colors.GREY_LIGHT_FONT,
          }}
        >
          <Typography sx={{ width: '100%', flexShrink: 0 }}>
            How often can I use the Faucet?
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          style={{
            backgroundColor: colors.GREY_LIGHT,
            color: colors.GREY_LIGHT_FONT,
          }}
        >
          <Typography>
            The faucet can be used once a day for one type of crypto.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
          style={{
            backgroundColor: colors.GREY_LIGHT,
            color: colors.GREY_LIGHT_FONT,
          }}
        >
          <Typography sx={{ width: '100%', flexShrink: 0 }}>
            What is the Wise Tribe?
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          style={{
            backgroundColor: colors.GREY_LIGHT,
            color: colors.GREY_LIGHT_FONT,
          }}>
          <Typography>
            The Wise Tribe is a community of crypto minded individuals who have an interest in PAW, BAN and NANO. 
            The Wise Tribe also hosts multiple PAW nodes which give out DAILY rewards for just owning PAW. 
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
          style={{
            backgroundColor: colors.GREY_LIGHT,
            color: colors.GREY_LIGHT_FONT,
          }}
        >
          <Typography sx={{ width: '100%', flexShrink: 0 }}>
            The faucet is not working for me
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          style={{
            backgroundColor: colors.GREY_LIGHT,
            color: colors.GREY_LIGHT_FONT,
          }}>
          <Typography>
            If the faucet it not working for you feel free to join our discord and post your support issue.
          </Typography>
          <LinkMUI href="https://discord.gg/FF8hgbHq44">Discord</LinkMUI>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

function UsingFaucetDialog({open, setOpen }) {
  const handleClose = (e, reason) => {
    // do not allow user to close the Using faucet Dialog
    if (reason === 'backdropClick') {
      return
    }
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        maxWidth={'sm'}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Sending rewards to account...
        </DialogTitle>
        <DialogContent
          style={{
            textAlign: 'center'
          }}
        >
          <CircularProgress></CircularProgress>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function HomeScreen() {
  const [severity, setSeverity] = useState(null)
  const [alert, setAlert] = useState("")

  verifyAuth(localStorage.getItem('authorization')).then( body => {
    if ('error' in body) {
      return
    }
    window.location.replace("/faucet")
  })

  return (
      <>
        <Box
        noValidate
        autoComplete="off"
        >
          <Typography style={{marginTop: '1em'}}>Authenticate with your email to get access to the Faucet</Typography>
          <TextField 
          style={{
            backgroundColor: colors.WHITE_OFF
          }}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              startEmailSession(e.target.value).then(body => {
                if (body.status_code !== 200) {
                  // console.log("Failed to create the email session. " + body.error)
                  setSeverity('error')
                  setAlert(body.error)
                  return
                }
                setSeverity('success')
                setAlert('Check your email to authenticate to the faucet - you may need to check spam.')
              })
                
            }
            
          }} id="email-input" label="Email" variant="outlined" />
        </Box>
        { severity !== null &&
          <Alert severity={severity}>{alert}</Alert>
        }
        <Button
        style={{
          backgroundColor: colors.CYAN,
          marginTop: '1em'
        }} 
        onClick={(e) => {
           startEmailSession(document.getElementById('email-input').value).then(body => {
            if (body.status_code !== 200) {
              setSeverity('error')
              setAlert(body.error)
              return
            }
            setSeverity('success')
            setAlert('Check your email to authenticate to the faucet - you may need to check spam.')    
          })
        }} variant="contained">Enter</Button>

      </>
  );
}

function Login() {
  const parts = window.location.href.split('?')
  const [severity, setSeverity] = useState(null)
  const [alert, setAlert] = useState("")

  if (parts.length === 1) {
    setSeverity('error')
    setAlert("Failed to get session ID")
  }

  const queryParams = new URLSearchParams("?" + parts[1])
  const sessionUUID = queryParams.get("session_uuid")
  if (sessionUUID === "" || sessionUUID === null) {
    setSeverity('error')
    setAlert("Session UUID not provided")
  }

  console.log("Session UUID: ", sessionUUID)

  authEmailSession(sessionUUID).then()

  const [authEmail, setAuthEmail] = useState(null)
  useEffect(() => {
    authEmailSession(sessionUUID).then(body => {
      setAuthEmail(body)
      if ('error' in body) {
        setSeverity('error')
        setAlert(body.error)
      } else {
        setSeverity('success')
        setAlert(`Successfully authenticated '${body.account}'`)

        localStorage.setItem('authorization', body.id_token)
        console.log("redirecting]")
        window.location.replace("/faucet")
      }
    })
  }, [])

  console.log(window.location.href)
  

  return (
    <div>
      <Typography>Authenticating to the Wise Tribe Faucet....</Typography>
      { severity !== null &&
          <Alert severity={severity}>{alert}</Alert>
      }
    </div>
  );
}

function Faucet() {
  const [severity, setSeverity] = useState(null)
  const [alert, setAlert] = useState("")
  const [severityCountDown, setSeverityCountDown] = useState(null)
  const [alertCountDown, setAlertCountDown] = useState("")
  const [cryptoType, setCryptoType] = useState("PAW")
  const [submitDisabled, setSubmitDisabled] = useState(true)
  const [countDown, setCountDown] = useState(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // If user is no longer authenticated kick them to the homescreen
    verifyAuth(localStorage.getItem('authorization')).then( body => {
      if ('error' in body) {
        window.location.replace("/")
        return
      }
      
    })
  }, [])

  const startFaucet = async (token, cryptoType, toAddress) => {
    const url =  `https://api.wisetribe.digital/api/faucet?crypto_type=${cryptoType}&to_address=${toAddress}`
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: token
      }
    })
    const body = await response.json()
    return body
  }

  const handleCryptoTypeChange = (e) => {
    setCryptoType(e.target.value)
  }

  const handleUseFaucet = (address) => {
    // only clear text input if it was successful same with disable
    setOpen(true)
    setSubmitDisabled(true)
    setSeverity('info')
    setAlert('Please be patient as we send your faucet rewards....')
    startFaucet(localStorage.getItem('authorization'), cryptoType, address).then(body => {
      setOpen(false)
      if ('error' in body) {
        setSeverity('error')
        setAlert(body.error)
        setSubmitDisabled(false)
        return
      }
      localStorage.setItem("last-used", address)
      document.getElementById('address-input').value = ""
      setSeverity('success')
      setAlert(`Sent faucet rewards to '${body.to_address}' - check your wallet`) 
      localStorage.setItem("expire_ts", body.expire_ts)
    })
  }

  const handleLastUsed = (e) => {
    console.log(e)
  }

  // count down component
  setInterval(() => {
    const now = ~~(new Date().getTime() / 1000)
    const expireTs = Number(localStorage.getItem('expire_ts'))
    const diff = expireTs - now

    if (diff <= 0) {
      return
    }

    const seconds = diff
    const mins = diff / 60 
    const hours = ~~(mins / 60)
    const minsLeft = ~~(mins - (hours * 60))
    const secondsLeft = ~~(seconds - ((minsLeft * 60) + (hours * 60 * 60)))

    setAlertCountDown(`Faucet used - come back in ${hours} hours ${minsLeft} mins ${secondsLeft} secs`)
    setSeverityCountDown('warning')
  },1000)


  return (
    <div>
        { severityCountDown !== null &&
          <Alert severity={severityCountDown}>{alertCountDown}</Alert>
        }
        <UsingFaucetDialog open={open} setOpen={setOpen}></UsingFaucetDialog>
        <Box
        noValidate
        autoComplete="off"
        >
        <Typography style={{marginTop: '1em'}}>Select the crypto you would like to get rewarded in</Typography>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={cryptoType}
          label="Age"
          onChange={handleCryptoTypeChange}
          style={{
            backgroundColor: colors.GREY_LIGHT_FONT,
            color: colors.GREY_LIGHT
          }}
        >
          <MenuItem value='PAW'>PAW</MenuItem>
          <MenuItem value='BAN'>Banano</MenuItem>
          <MenuItem value='NANO'>NANO</MenuItem>
        </Select>
        </Box>
        <Box
        noValidate
        autoComplete="off"
        >
          <Typography style={{marginTop: '1em'}}>Enter your {cryptoType} address</Typography>
          <TextField 
            style={{
              backgroundColor: colors.GREY_LIGHT_FONT,
              color: colors.GREY_LIGHT
            }}
            onChange={(e) => {
              // console.log(e)
              // on any key inside of the text field make submit button undisable
              if (e.target.value.startsWith(cryptoType.toLowerCase() + "_")) {
                setSubmitDisabled(false)
              } else if (!submitDisabled) {
                setSubmitDisabled(true)
              }
            }} 
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                handleUseFaucet(e.target.value)
              }
          }} id="address-input" label={cryptoType.toLowerCase() + "_1234"} variant="outlined" />
        </Box>
        {/* <Box>
          { localStorage.getItem('last-used') !== null &&
            <Chip label="Use previous address" variant="outlined" onClick={handleLastUsed} />
          }
        </Box> */}
        { severity !== null &&
          <Alert severity={severity}>{alert}</Alert>
        }
        
        <Button
          style={{
            backgroundColor: colors.CYAN,
            color: colors.WHITE_OFF,
            marginTop: '1em'
          }} 
          onClick={(e) => {
          handleUseFaucet(document.getElementById('address-input').value)
        }} variant="contained" disabled={submitDisabled}>Get {cryptoType}</Button>
        
    </div>
  );
}

function App() {
  return (
    <div
      style={{
        height: '100vh',
        minHeight: '100vh',
        backgroundColor: colors.GREY_LIGHT,
        color: colors.GREY_LIGHT_FONT,
        textAlign: 'center'
    }}>
      <div style={{
        backgroundColor: colors.CYAN,
        color: colors.WHITE_OFF,
        marginBottom: '1em'
      }}>
        <Typography variant="h3" component="div">Wise Tribe Faucet</Typography>
        <Divider />
      </div>
      <Alert severity='info'>Wise Tribe, Grumby Bear, RacoonPAW and Naked tribe members get 22% more from the faucet!</Alert>
      <Alert severity='info'>For a limited time the faucet will be giving out 10X more than normal!</Alert>
      <Router>
        <Routes>
          <Route path="/" element={<HomeScreen/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/faucet" element={<Faucet/>} />
        </Routes>
      </Router>
      <div style={{
        color: colors.GREY_LIGHT_FONT,
        marginTop: '3em',
      }}>
        <Typography variant="h3" component="div">FAQ</Typography>
        <Divider light/>
        <Divider light/>
        <Divider light/>
        <Divider light/>

      </div>
      <FAQ
        style={{
          maxWidth: '80vh'
        }}
      ></FAQ>
      {/* <footer style={{color: "gray", position: "fixed", bottom: 0}}>
        <Typography style={{textAlign: 'center'}}>What is the wise tribe?</Typography>
      </footer> */}
    </div>
  );
}

export default App;
