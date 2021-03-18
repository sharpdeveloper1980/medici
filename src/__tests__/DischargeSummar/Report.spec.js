import React,{ useState,useEffect } from "react";
import { create } from "react-test-renderer";
import { useAuth0 } from "@auth0/auth0-react";
import config from "../../auth_config.json";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
const Report = (props) => {
    const [reportdata, setData] = useState([]);
    const { getAccessTokenSilently } = useAuth0();
    useEffect(()=>{
        responseJson=[
            {
              "id": 1,
              "chartdate": "2164-11-01",
              "charttime": null,
              "category": "Discharge summary",
              "description": "Report"
            }
          ]
        setData(responseJson);
    },[]);
    return (
        <Accordion>
             {reportdata && reportdata.map((item,index) => {
            return(
                <AccordionItem key={index}>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                        <div className="AccordionHeaderblock">
                            <div className="AccordionHeaderblock1">CATEGORY </div>
                            <div className="AccordionHeaderblock2">: { item.category }</div>
                        </div>
                        <div className="AccordionHeaderblock">
                            <div className="AccordionHeaderblock1">DESCRIPTION </div>
                            <div className="AccordionHeaderblock2">: { item.description }</div>
                        </div>
                        <div className="AccordionHeaderblock">
                            <div className="AccordionHeaderblock1">DATE </div>
                            <div className="AccordionHeaderblock2">: { item.chartdate }</div>
                            </div>
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      
                    </AccordionItemPanel>
                </AccordionItem>
            )})}
            
        </Accordion>
    );
}
describe("Report component", () => {
  test("Matches the snapshot", () => {
    const report = create(<Report />);
    expect(report.toJSON()).toMatchSnapshot();
  });
});