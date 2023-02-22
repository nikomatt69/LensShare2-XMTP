import { Button } from '@/components/UI/Button';
import  Loader  from '@/components/UI/Loader';
import { ERROR_MESSAGE } from '@/constants';
import { CustomErrorWithData } from '@/utils/custom-types';
import { getModule } from '@/utils/functions/getModule';
import { useGenerateModuleCurrencyApprovalDataLazyQuery } from '@/utils/lens';
import type { Dispatch, FC } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { BsExclamation } from 'react-icons/bs';
import { useSendTransaction, useWaitForTransaction } from 'wagmi';

interface Props {
  title?: string;
  module: any;
  allowed: boolean;
  setAllowed: Dispatch<boolean>;
}

const AllowanceButton: FC<Props> = ({ title = `Allow`, module, allowed, setAllowed }) => {
    const [showWarningModal, setShowWarningModal] = useState(false);
    const [generateAllowanceQuery, { loading: queryLoading }] =
        useGenerateModuleCurrencyApprovalDataLazyQuery();
    
    
    const onError = (error: CustomErrorWithData) => {
        toast.error(error?.data?.message ?? error?.message ?? ERROR_MESSAGE)
    }


    const {
        data: txData,
        isLoading: transactionLoading,
        sendTransaction
    } = useSendTransaction({
        request: {},
        mode: 'recklesslyUnprepared',
        onError
    });

    const { isLoading: waitLoading } = useWaitForTransaction({
        hash: txData?.hash,
        onSuccess: () => {
            toast.success(`Module ${allowed ? 'disabled' : 'enabled'} successfully!`);
            setShowWarningModal(false);
            setAllowed(!allowed);
        },
        onError
    });

    const handleAllowance = (currencies: string, value: string, selectedModule: string) => {
        generateAllowanceQuery({
            variables: {
                request: {
                    currency: currencies,
                    value: value,
                    [getModule(module.module).field]: selectedModule
                }
            }
        }).then((res) => {
            const data = res?.data?.generateModuleCurrencyApprovalData;
            sendTransaction?.({
                recklesslySetUnpreparedRequest: {
                    from: data?.from,
                    to: data?.to,
                    data: data?.data
                }
            });
        });
    };

    return allowed ? (
        <Button
            variant="warning"
            icon={
                queryLoading || transactionLoading || waitLoading ? (
                    <Loader />
                ) : (
                    <BiMinus className="w-4 h-4" />
                )
            }
            onClick={() => handleAllowance(module.currency, '0', module.module)}
        >
        Revoke
        </Button>
    ) : (
        <>
        <Button
            variant="success"
            icon={<BiPlus className="w-4 h-4" />}
            onClick={() => setShowWarningModal(!showWarningModal)}
        >
            {title}
        </Button>
                <Button
                    variant="success"
                    icon={
                        queryLoading || transactionLoading || waitLoading ? (
                            <Loader />
                        ) : (
                            <BiPlus className="w-4 h-4" />
                        )
                    }
                    onClick={() =>
                        handleAllowance(module.currency, Number.MAX_SAFE_INTEGER.toString(), module.module)
                    }
                >
                    {title}
                </Button>

        </>
    );
};

export default AllowanceButton;