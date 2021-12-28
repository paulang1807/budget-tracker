import { makeStyles, createTheme } from '@material-ui/core/styles';
import styled from 'styled-components';

// MUI Styles
export const useStyles = makeStyles(() => ({
    paper: { minWidth: "675px",
            borderRadius: "10px" },
}));

// Styled Components
export const DateSelectorWrapper = styled.div`
  height: 35px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  margin: 5px;
`;

export const DateSelectorArrows = styled.div`
  width: 40px;
  height: 100%;
  position: relative;
  cursor: pointer;
  margin: 0 2px;

  & div {
    height: 34px;
    width: 34px;
    background-image: linear-gradient(180deg, #c9d9f1, #1a4482);
    border-radius: 100%;
    line-height: 35px;
    text-align: center;
    position: absolute;
    top:50%;
    left: 50%;
    margin-left: -17px;
    margin-top: -17px;

    &:hover{
      background-image: linear-gradient(180deg, #b7d5f5, #5990ca);
    }
  }
`;

export const DateSelectorButton = styled.div`
  width: 100%;
  height: 35px;
  font-size: 20px;
  font-weight: bold;
  color: #dedede;
  text-align: center;
  background-image: linear-gradient(180deg, #c9d9f1, #1a4482);
  border-radius: 15px;
  padding-top: 3px;
  margin-left: 1px;
  cursor: pointer;

  &:hover{
    color: #fff;
    background-image: linear-gradient(180deg, #b7d5f5, #5990ca);
  }
`;

export const DateSelectorGrid = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const DateArrowBase = styled.span`
  // Create left and bottom borders
  width: 8px;
  height: 8px;
  border-left: 4px solid #dedede;
  border-bottom: 4px solid #dedede;
  position: absolute;
  left: 50%;
  top:50%;
  margin-top: -4px;

  &:hover{
    border-left: 4px solid #fff;
    border-bottom: 4px solid #fff;
  }
`;

export const MonthArrow = styled(DateArrowBase)`
  // Rotate left hand arrows by 45 degrees to give the appearance of arrows
  // Rotate right hand arrows by 225 degrees to point right
  transform: ${props => props.right ? "rotate(225deg)" : "rotate(45deg)"};
  margin-left: ${props => props.right ? "-4px" : "-2px"};
`;

export const YearArrow = styled(DateArrowBase)`
  // Rotate right hand side arrows to right
  transform: ${props => props.right ? "rotate(225deg)" : "rotate(45deg)"};
  // Arrow margins and positioning
  margin-left: ${props => props.right ? "1px" : "-9.5px"};

  // Add double arrows for year
  &:after{
    width: 8px;
    height: 8px;
    border-left: 4px solid #dedede;
    border-bottom: 4px solid #dedede;
    position: absolute;

    // Add double arrows for year
    content: '';
    left: 3px;
    top: -10.75px
  }
`;