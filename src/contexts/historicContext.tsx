import { createContext, ReactNode, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { equalTo, limitToLast, onValue, orderByChild, query, ref } from "firebase/database";
import dayjs from "dayjs";
import { db } from "../database/firebase.config";
import { formated } from "../utils/formated";

export interface IHistoricalItemInterface {
    id: string;
    type: string;
    title: string;
    value: number;
    date: string;
}

type HistoricProviderProps = {
    children: ReactNode
}
type TOptionsTypes = "today" | "expenses" | "revenue";

interface IHistoricInterface {
    balance: number | 0 | undefined
    formatedBalance: string | 0 | undefined
    historic: IHistoricalItemInterface[]
    loading: boolean
    selectedOption: TOptionsTypes,
    setSelectedOption: React.Dispatch<React.SetStateAction<TOptionsTypes>>
    totalExpenses: number | 0
    totalRevenue: number | 0
    totalRegisters: number

}

export const HistoricContext = createContext({} as IHistoricInterface);

function HistoricProvider({ children }: HistoricProviderProps) {
    const { user } = useAuth()
    const { uid } = user || {};
    const [balance, setBalance] = useState<number | undefined>(undefined);
    const formatedBalance = balance && formated(balance)
    const [historic, setHistoric] = useState<IHistoricalItemInterface[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [selectedOption, setSelectedOption] = useState<TOptionsTypes>('today');
    const [totalExpenses, setTotalExpenses] = useState<number>(0);
    const [totalRevenue, setTotalRevenue] = useState<number>(0);
    const [totalRegisters, setTotolRegisters] = useState<number>(0)


    async function filter(selectedOption: TOptionsTypes, historicData: IHistoricalItemInterface[]): Promise<void> {
        if (selectedOption === "today") {
            return setHistoric(historicData.filter((item) => item.date === dayjs().format("DD/MM/YYYY")))
        }
        if (selectedOption === "revenue") {
            return setHistoric(historicData.filter((item) => item.type === "receita").reverse());
        }
        if (selectedOption === "expenses") {
            return setHistoric(historicData.filter((item) => item.type === "despesa").reverse());
        }
    }


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const dataRef = ref(db, `historic/${uid}/`)
            const userRef = ref(db, `users/${uid}/`)

            const getBalance = onValue(userRef, (snapshot) => {
                const userBalance = snapshot.val()?.balance;
                setBalance(userBalance !== undefined ? userBalance : undefined)
                setLoading(false)
            });



            const q = await query(
                dataRef,
                orderByChild("date"),
                limitToLast(10)
            )

            const getData = onValue(q, async (snapshot) => {
                const historicData: IHistoricalItemInterface[] = [];

                snapshot.forEach((item) => {
                    let data: IHistoricalItemInterface = {
                        id: item.key,
                        type: item.val().type,
                        value: item.val().value,
                        title: item.val().title,
                        date: item.val().date
                    };
                    historicData.push(data);

                });

                setHistoric(historicData.reverse())

                const expenses = historicData.filter((item) => item.type === "despesa"
                ).reduce((acc, item) => acc + item.value, 0)
                setTotalExpenses(expenses)

                const revenue = historicData.filter((item) => item.type === "receita"
                ).reduce((acc, item) => acc + item.value, 0)
                setTotalRevenue(revenue)

                setTotolRegisters(historicData.length)

                await filter(selectedOption, historicData)


                setLoading(false);

            })

            return () => {
                getData()
                getBalance()
                setLoading(false)
            }
        }
        fetchData()
    }, [uid, selectedOption, balance])

    return (
        <HistoricContext.Provider value={{
            balance,
            formatedBalance,
            historic,
            loading,
            setSelectedOption,
            selectedOption,
            totalExpenses,
            totalRevenue,
            totalRegisters
        }}>
            {children}
        </HistoricContext.Provider>
    )
}

export default HistoricProvider
