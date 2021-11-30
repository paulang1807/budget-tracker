import styled from 'styled-components';

export const TooltipContent = styled.div`
  background-color: #333;
  border-radius: 5px;
  width: max-content;
  max-width: 300px;
  max-height: 700px;
  overflow-y: auto;
  font-size: 12px;
  color: white;
  padding: 10px 15px;
  font-weight: 400;
  z-index: 999;
`;