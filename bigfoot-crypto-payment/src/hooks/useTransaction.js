import { useState } from 'react';
import { usePaymentStore } from '../stores/paymentStore';
import { useWallet } from './useWallet';
import { sendPaymentNotification } from '../services/emailService';
import { getFoundationAddress } from '../services/priceService';

export const useTransaction = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { 
    transaction,
    setTransaction,
    setEmailSent,
    setEmailError,
    getPaymentSummary
  } = usePaymentStore();
  
  const { sendTx, connectedWallet } = useWallet();

  // Execute complete payment flow
  const executePayment = async () => {
    if (!connectedWallet) {
      throw new Error('Brak połączonego portfela');
    }

    setIsProcessing(true);
    setTransaction({ status: 'pending', timestamp: Date.now() });

    try {
      // Get payment details
      const summary = getPaymentSummary();
      const foundationAddress = getFoundationAddress(
        connectedWallet.blockchainType, 
        summary.blockchain
      );

      if (!foundationAddress) {
        throw new Error('Brak adresu fundacji dla wybranej sieci');
      }

      // Send transaction
      console.log(`Sending ${summary.amountCrypto} ${summary.currency} to ${foundationAddress}`);
      
      const txHash = await sendTx(foundationAddress, parseFloat(summary.amountCrypto));
      
      // Update transaction status
      setTransaction({ 
        hash: txHash, 
        status: 'confirmed',
        amount: summary.amountCrypto,
        currency: summary.currency
      });

      // Send email notification
      try {
        await sendPaymentNotification({
          ...summary,
          txHash,
          foundationAddress
        });
        setEmailSent(true);
      } catch (emailError) {
        console.error('Email notification failed:', emailError);
        setEmailError(emailError.message);
        // Don't fail the whole transaction for email issues
      }

      return { success: true, txHash };
    } catch (error) {
      setTransaction({ status: 'failed' });
      console.error('Payment execution failed:', error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  // Simulate payment for testing
  const simulatePayment = async () => {
    setIsProcessing(true);
    setTransaction({ status: 'pending', timestamp: Date.now() });

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockTxHash = '0x' + Array.from({length: 64}, () => 
        Math.floor(Math.random() * 16).toString(16)
      ).join('');

      setTransaction({ 
        hash: mockTxHash, 
        status: 'confirmed',
        amount: getPaymentSummary().amountCrypto,
        currency: getPaymentSummary().currency
      });

      // Send email notification with mock data
      try {
        await sendPaymentNotification({
          ...getPaymentSummary(),
          txHash: mockTxHash,
          foundationAddress: 'mock_foundation_address'
        });
        setEmailSent(true);
      } catch (emailError) {
        setEmailError(emailError.message);
      }

      return { success: true, txHash: mockTxHash };
    } catch (error) {
      setTransaction({ status: 'failed' });
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    // State
    transaction,
    isProcessing,
    
    // Actions
    executePayment,
    simulatePayment,
    
    // Utils
    canExecute: !!connectedWallet && transaction.status !== 'pending'
  };
};