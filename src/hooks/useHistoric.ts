import { useContext } from 'react';
import { HistoricContext } from '../contexts/historicContext';

export const useHistoric = () => useContext(HistoricContext);
