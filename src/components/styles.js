import { Box, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StepperWrapper = styled(Stack)({
    alignItems: 'center',
    '.MuiStepper-root': {
        width: '100%',
    },
    '.MuiStep-root': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        alignSelf: 'center',
    },
    '.MuiStepLabel-alternativeLabel': { textTransform: 'capitalize' },
    margin: '16px 0px',
    padding: '16px',
    background: '#fff',
    borderRadius: '8px',
})

export const StyledBox = styled(Box)({
    border: '1px solid #EDEDED',
    margin: '16px 0px',
    padding: '16px',
    borderRadius: '4px',
})
