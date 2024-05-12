import { Box, CircularProgress, Typography } from "@mui/material";
import PropTypes from 'prop-types'


/**
 * @description: this was ripped directly from the mui library website
 * @returns 
 */
export default function CircularProgressWithLabel(props) {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress sx={{color:"var(--dark)"}} variant="determinate" {...props} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary">
            {`${Math.round(props.value)}%`}
          </Typography>
        </Box>
      </Box>
    );
  }
  
  CircularProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate variant.
     * Value between 0 and 100.
     * @default 0
     */
    value: PropTypes.number.isRequired,
  };
  