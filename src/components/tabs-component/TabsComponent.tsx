import { ReactElement, SyntheticEvent, useEffect, useMemo, useState } from "react";

interface TabComponentInterface {
    children: Array<ReactElement>;
    tabPadding: string;
    tabColour: string;
    tabBackgroundColour: string;
    tabRowBackgroundColour: string;
    contentPadding: string;
    contentColour: string;
    contentBackgroundColour: string;
}

const TabsComponent = (props:TabComponentInterface) => {
    const Styles = useMemo(() => {
        return (
            `
                .tab-wrapper .tab {
                    padding: ${props.tabPadding};
                    background-color: ${props.tabBackgroundColour};
                    color: ${props.tabColour};

                }

                .tab-name-row {
                    background-color: ${props.tabBackgroundColour};
                }

                .tab-wrapper .content {
                    background-color: ${props.contentBackgroundColour};
                    color: ${props.contentColour};
                    padding: ${props.contentPadding};
                    padding-top: 0;
                    padding-bottom: 0;
                }

                .tab-wrapper.active .content {
                    padding: ${props.contentPadding};
                }
            `
        );
    }, []);

    useEffect(() => {}, [Styles]);

    const [getTabState, setTabState] = useState(() => {
        return Object.entries(props.children).map((item, index) => {
            return index === 0 ? true : false;
        });
    });

    function tabOnClick (e:SyntheticEvent) {

        const target = (e.target as HTMLElement);

        if (target !== null && target.closest('.tab-wrapper') !== null) {
            const ClickedIndex = Number((target.closest('.tab-wrapper') as HTMLElement).getAttribute('data-index'))
            const currentDate = getTabState.map((item, index) => {
                return ClickedIndex == index ? true : false;
            });
            setTabState(currentDate);
        }
    }

    const TabNameRow = props.children.map((item, index) => {
        return (
            <div key={index} data-index={index} className={getTabState[index] ? "tab-wrapper active": "tab-wrapper"} onClick={(e) => tabOnClick(e)}>
                {item.props.children[0]}
            </div>
        );
    });

    const TabContent = props.children.map((item, index) => { 
        return (
            <div key={index} data-index={index} className={getTabState[index] ? "tab-wrapper active": "tab-wrapper"} onClick={(e) => tabOnClick(e)}>
                {item.props.children[1]}
            </div>
        );
    });

    return (
        <>
            <style>
                {Styles}
            </style>
            <div className="tab-container">
                <div className="tab-name-row">
                    {TabNameRow}
                </div>
                <div className="tab-content-row">
                    {TabContent}
                </div>
            </div>
        </>
    );
}

export default TabsComponent;