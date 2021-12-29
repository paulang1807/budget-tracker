import styled from 'styled-components';
import "../App.css";

export const DateGridWrapper = styled.div`
  border: 2px;
  border-style: solid;
  border-radius: 8px;
  padding-top: 5px;
  width: 300px;
  margin-bottom: 5px;
`;

const DataGridFlex = styled.div`
  display: flex;
  flex-direction: row;
`;

export const DataGridHead = styled(DataGridFlex)`
  height: 55px;
`;

export const DataGridBody = styled(DataGridFlex)`
  margin-top: 2px;
`;

export const DateGridButton = styled.div`
  float: left;
  width: 45px;
  height: 100%;
  box-sizing: border-box;
  position: relative;
`;

export const DateGridArrows = styled.div`
  float: left;
  height: 35px;
  width: 35px;
  background-image: linear-gradient(180deg, var(--button-background-grad1), var(--button-background-grad2));
  border-radius: 100%;
  line-height: 35px;
  text-align: center;
  position: absolute;
  top:50%;
  left: 50%;
  margin-left: -17px;
  margin-top: -17px;

  &:hover{ 
    cursor: pointer;
    background-image: linear-gradient(180deg, var(--button-hover-grad1), var(--button-hover-grad2));
  }
`;

export const DataGridHeader = styled.div`
  float: left;
  width: 120px;
  height: 100%;
`;

const DataGridHeaderBase = styled.div`
  float: left;
  width: 100%;
  color: var(--date-grid-title);
  font-weight: 200px;
  text-align: center;
`;

export const DataGridYear = styled(DataGridHeaderBase)`
  height: 30px;
  font-size: 27px;
`;

export const DataGridMonth = styled(DataGridHeaderBase)`
  height: 15px;
  font-size: 13px;
`;

export const DataGridBodyWrapper = styled.div`
  width: 100%;
`;

export const DataGridBodyDayWrapper = styled(DataGridBodyWrapper)`
  height: 25vh;
`;

const DataGridDayBase = styled.div`
  position: relative;
  display: block;
  float: left;
`;

export const DataGridWeekday = styled(DataGridDayBase)`
  width: 14.285%;
  font-weight: 700;
  color: var(--date-grid-text);
  font-size: 9px;
  text-align: center;
`;

export const DataGridBodyDay = styled(DataGridDayBase)`
  width: 100%;
  height: 100%;

  > span {
    position: relative;
    display: block;
    width: 1.5vw;
    margin-top: -15px;
    margin-left: -15px;
    left: 50%;
    top: 50%;
    color: var(--date-grid-text);
    font-size: 12px;
    font-weight: 400;
    border-radius: 100%;
    line-height: 30px;
    text-align: center;

    &:hover{
      cursor: pointer;
      background: var(--date-grid-text-hover);
    } 
  }
`;

export const DataGridDayContainer = styled(DataGridDayBase)`
  width: 14.285%;
  height: 16.6666%;
`;

const DateArrowBase = styled.span`
  // Create left and bottom borders
  display: block;
  float: left;
  width: 6px;
  height: 6px;
  border-left: 2px solid var(--button-text);
  border-bottom: 2px solid var(--button-text);
  position: absolute;
  left: 50%;
  top:50%;
  margin-top: -3.5px;

  &:hover{
    border-left: 2px solid var(--button-hover-text);
    border-bottom: 2px solid var(--button-hover-text);
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
  margin-left: ${props => props.right ? "1.5px" : "-7px"};

  // Add double arrows for year
  &:after{
    display: block;
    float: left;
    width: 6px;
    height: 6px;
    border-left: 2px solid var(--button-text);
    border-bottom: 2px solid var(--button-text);
    position: absolute;

    // Add double arrows for year
    content: '';
    left: 3px;
    top: -7px;
  }
`;