import React, { Component } from "react";
import { create } from "react-test-renderer";
import config from "../../auth_config.json";
import {  Card } from 'reactstrap';
import sortBy from 'lodash.sortby';

class ReportDetails extends Component {
  
    constructor(props) {
      super(props);
      this.state = {
        value: [{start: 17, end: 19, tag: 'PERSON','label':'','status':1,'label_status':0}],
        text : '',
        annotation_select:[],
        tag : '',
        tag_description : '',
      };
    }
    handleChange = value => {
     
    }
    handleTagChange = e => {
      
      this.setState({tag: e.target.value})
    }
    componentDidMount(props){
        let responseJson={
            "id": 1,
            "chartdate": "2164-11-01",
            "charttime": null,
            "category": "Discharge summary",
            "description": "Report",
            "text": "Admission Date:  [**2164-10-23**]              Discharge Date:   [**2164-11-1**]\n\nDate of Birth:  [**2094-3-5**]             Sex:   F\n\nService: MEDICINE\n\nAllergies:\nLidocaine / Heparin Sodium\n\nAttending:[**First Name3 (LF) 18141**]\nChief Complaint:\nFever and chills\n\nMajor Surgical or Invasive Procedure:\nHD tunnel catheter replacement\n\nHistory of Present Illness:\nMs. [**Known lastname **] is a 70 year old female with ESRD on HD through\ntunneled catheter (hx of peritoneal dialysis until VRE\nperitonitis and PD catheter removal in [**2164-10-13**]), HTN, DMII,\nCAD, Afib, CHF (EF 50%), who presents from [**Location (un) 4265**] Dialsis with\nfever, chills for one hour during HD.  Dialysis was completed\nand the patient was transferred to [**Hospital1 18**] where she was found to\nhave a temperature of 103 and HR of 120 with lactate of 4.4.\nMs. [**Known lastname **] received Ceftriaxone 1g IV, Flagyl 500mg IV, and\ntylenol (unasyn 3g x1 written for but never signed) in the ED.\nShe denied any SOB, cough, sputum, n/v/d, dysuria, burning or\ndifficulty with urination. As per patient and her family, the\npatient has been in her USOH up until this point. Ms. [**Known lastname **]\nwas admitted to [**Hospital Unit Name 153**] for sepsis protocol.\n\nPast Medical History:\nAtrial fibrillation\nSignificant for recurrent GI bleeding from AVMs-colonoscopy\ngastro and small bowel enteroscopy all showing AVM.\nFour endoscopies which showed bleeding ulcers in the colon and\nsmall intestine, and were\ntreated with cauterization.\nNon-insulin-dependent diabetes - diagnosed at the age of 50-\nHgbA1C = 6.2 in [**7-18**]\nhypertension\ncongestive heart failure,\ngout\nESRD secondary to hypertensive nephrosclerosis on peritoneal\ndialysis x 3 years without complications\nchronic anemia\naortic insufficiency.\nRecent admission to NEBH in [**7-18**] for diverticulitis\n[**3-18**]- C. dificile, pancolitis associated with hypokalemia,\nprofound weight loss, dehydration, and hypomagnesemia.\nH/o parotitis\nH/o gout\nH/o Clostridium [**Doctor Last Name **] sepsis\n\nPAST SURGICAL HISTORY:\nLaminectomy, C-section x4, and cholecystectomy.\nPast Cardiac history:\n[**7-/2161**]- MIBI- 1) Moderate, fixed perfusion defects in the\nlateral wall, involving especially the inferior portion. 2)\nMulti-vessel disease cannot be excluded given left ventricular\nenlargement, global hypokinesis, and depressed EF of 43%.\n\nCath: [**2161-10-15**]- R dominant system with nml coronary\narteries\n\n[**7-18**]:Echo: LVK, global HK, LVEF is 50%.\n\n\n\nSocial History:\nRetired RN. Pt has been living at [**Name Prefix (Prefixes) **] [**Last Name (Prefixes) **] rehab since her last\ndischarge from [**Hospital1 18**] and communtes to [**Location (un) 4265**] for dialysis three\ntimes a week.   Pt admits to 100 pack year history of smoking\n(2ppd x 49 years).  However, the patient denies any history of\nalcohol use or illicit drug use.\n\n\nFamily History:\nOne son has hypertension and one son recently had a cerebro\nvascular accident. Her mother died of a ruptured cerebral\naneurysm and father died when he was 80.\n\n\nPhysical Exam:\nPhysical Exam:\nVS: Tc: 98.6   HR: 93   BP: 120s/50s   RR: 15   SaO2: 100%\nGen: patient lying in bed in NAD, appearing younger than her\nstated age. She is alert and oriented x3 and conversing\nappropriately\nHEENT: PERRL, EOMI, anicteric, mmm\nNeck: Left IJ bandage has dried blood but otherwise, no obvious\nsigns of bleeding, hematoma, tenderness at site.\nCV: RRR S1, S2, ?SEM at LSB\nChest: CTA bilaterally, R tunneled IJ with dressing c/d/i.  No\nsigns of acute bleeding, hematoma, pus drainage, tenderness to\npalpation\nAbd: soft, NT, ND, well healed scar at PD site\nExt: warm, well perfused, no c/c/e\n\n\nPertinent Results:\n[**2164-10-23**] 05:33PM   LACTATE-4.4*\n[**2164-10-23**] 05:38PM   PT-21.2* PTT-32.7 INR(PT)-2.8\n[**2164-10-23**] 05:38PM   NEUTS-86.6* LYMPHS-7.9* MONOS-5.0 EOS-0.4\nBASOS-0.2\n[**2164-10-23**] 05:38PM   WBC-7.8 RBC-4.46 HGB-13.7 HCT-42.4 MCV-95\nMCH-30.8 MCHC-32.4 RDW-20.0*\n[**2164-10-23**] 05:38PM   CRP-8.92*\n[**2164-10-23**] 05:38PM   CORTISOL-49.3*\n[**2164-10-23**] 05:38PM   ALT(SGPT)-9 AST(SGOT)-40 ALK PHOS-167* TOT\nBILI-1.0\n[**2164-10-23**] 05:38PM   GLUCOSE-217* UREA N-9 CREAT-3.0*# SODIUM-139\nPOTASSIUM-6.0* CHLORIDE-96 TOTAL CO2-29 ANION GAP-20\n\nCLOSTRIDIUM DIFFICILE(Final [**2164-10-31**]): FECES NEGATIVE FOR C.\nDIFFICILE TOXIN BY EIA.\n\nAEROBIC BOTTLE (Final [**2164-10-27**]):\n      STAPHYLOCOCCUS, COAGULASE NEGATIVE.    ISOLATED FROM ONE\nSET ONLY.\n         SENSITIVITIES REQUESTED BY DR. [**Last Name (STitle) **]. ABULO (PAGER [**Numeric Identifier **]).\n         FINAL SENSITIVITIES.\n         COAG NEG STAPH does NOT require contact precautions,\nregardless of\n         resistance.\n         Oxacillin RESISTANT Staphylococci MUST be reported as\nalso\n         RESISTANT to other penicillins, cephalosporins,\ncarbacephems,\n         carbapenems, and beta-lactamase inhibitor combinations.\n\n         Rifampin should not be used alone for therapy.\n         Please contact the Microbiology Laboratory ([**6-/2466**])\nimmediately if\n         sensitivity to clindamycin is required on this\npatient's isolate.\n\n                              SENSITIVITIES: MIC expressed in\nMCG/ML\n\n_________________________________________________________\n                             STAPHYLOCOCCUS, COAGULASE NEGATIVE\n                             |\nERYTHROMYCIN----------   =>8 R\nGENTAMICIN------------ <=0.5 S\nLEVOFLOXACIN----------     4 I\nOXACILLIN-------------   =>4 R\nPENICILLIN------------ =>0.5 R\nTETRACYCLINE----------   <=1 S\nVANCOMYCIN------------     2 S\n\n   ANAEROBIC BOTTLE (Final [**2164-10-26**]):\n      REPORTED BY PHONE TO [**Last Name (LF) **],[**First Name3 (LF) 99628**] ON [**2164-10-24**] @\n2118.\n      STAPHYLOCOCCUS, COAGULASE NEGATIVE.    ISOLATED FROM ONE\nSET ONLY.\n         SENSITIVITIES PERFORMED FROM AEROBIC BOTTLE.\n\nCT abdomen:\n1) Thickened wall in long segment of sigmoid colon, consistent\nwith diverticulitis, unchanged. There is a small amount of\ninterlooped free fluid in the pelvis, not amenable to drainage.\n2) Pelvic fluid collection, of uncertain origin, that was\naspirated from [**10-17**] and shown to be not contaminated, and\nunchanged.\n\nTTE: Moderate aortic regurgitation and minimal aortic stenosis\nbut no discrete vegetation seen (does not exclude). Regional\nleft ventricular systolic dysfunction c/w CAD. Mild mitral\nregurgitation.\n\nCompared with the prior study (tape reviewed) of [**2161-7-23**], left\nventricular systolic function is now depressed (40%). The\nseverity of aortic regurgitation is similar.\n\nCXR: Right jugular dialysis catheter is in right atrium. PICC\nline is in SVC, partly obscured by the dialysis catheter. Linear\natelectases are present in both lower zones. No pleural\neffusion. Degenerative changes are present in the thoracic spine\nand in the glenohumeral joints bilaterally. Surgical clips are\npresent in the right upper quadrant status post cholecystectomy.\n\n\nBrief Hospital Course:\nA/P: Ms. [**Known lastname **] is a 70 year old women with ESRD on HD who\npresents with fever to 103, chills, and tachycardia to 103 with\npossible line infection.\n.\n1.  Sepsis:  The patient was initially sent to the intensive\ncare unit under the sepsis protocol. She was started on\nvancomycin for skin flora and unasyn for Group D enterococcus\n(VRE) sensitive to amp (previous infections over last year). Her\nblood cultures drawn at [**Location (un) 4265**] grew out oxacillin resistant coag\nnegative staph. Her urine cultures were without grown.  A CXR\nwas obtained and was without signs of pneumonia. Once she was\nstabilized, Ms. [**Known lastname **] was sent to the floor where her\ntunneled catheter was removed. The tip was sent for culture but\ndid not grow any organisms.\nAccess was an issue as 3 attempts in ED failed, including one\nwith US. Instead a PICC was placed and eventually, after she was\nfree of bacteria for > 48 hours, a new tunnel line was placed.\n\nDespite placement of a new line and clean surveillance cultures,\nMs. [**Known lastname **] continued to spike fevers. She spiked through her\nvancomycin which was always re-dosed when her daily levels fell\nbelow 15. An [**Known lastname 1676**] CT was obtained, revealing a 7 cm mass,\nconsistent with an abscess, above the bladder. Considering that\nshe had been recently hospitalized with a diverticulitis and\nperitonitis, it seemed urgent to intervene on this \"abscess\". It\nwas evacuated under IR guidance but no organisms appeared on\ngram stain and nothing grew on culture. It became apparent that\nthis was most likely a fluid collection from the patient's\nperitoneal dialysis. The patient continued to spike fevers so a\nwork up was commenced that included a chest x ray, a TTE (since\nshe has a murmur, although old) and more blood and urine\ncultures. All these studies were negative. As the patient\ncontinued to spike fevers and had one bout of emesis, another\n[**Known lastname 1676**] CT was obtained. It showed diverticulitis and so a 14\nday course of flagyl and levofloxacin was started. It was\ndecided that a general surgery consult would be obtained once\nshe was an outpatient in order to faciliate resection of the\naffected length of bowel. At discharge, Ms. [**Known lastname **] was\ninstructed to continue her levo, flagyl, and vanco to complete a\n14 day course of each one. Her vanco levels were to be followed\nand redosed at HD.\n.\n2.  ESRD:  Ms. [**Known lastname **] usually dialyzes on Tues, Thurs, Sat but\nhere she was switched to Monday, Wednesday and Saturday under\nthe guidance of the renal team. Her electrolytes were followed\nand repleted very consevatively as needed. It was noted that her\nphosphate calcium product was quite high, so her sevelamer was\ntitrate up. She was also placed on a renal diet. The patient\nreports making urine, however not an adequate measure of\nperfusion due to ESRD. She hopes to continue her peritoneal\ndialysis and felt were upset at having to start HD. The method\nof dialysis was to be further addressed as an outpatient with\nher PCP [**Last Name (NamePattern4) **]. [**First Name (STitle) **], after her diverticular disease was resolved.\n\n.\n3.  DMII:  Ms. [**Known lastname **] is usually on oral hypoglycemics. These\noral agents were held due to their long half life and instead\nshe was covered with RISS with QID finger sticks. Her home\nregimen of glipizide was restarted at discharge. While in house,\nshe was on a controlled carbohydrate diet.\n.\n4.  HTN:  Ms.[**Known lastname 14301**] home regimen includes metoprolol,\nmoexipril and diltiazem. Initially the metoprolol was continued\nand the diltiazem and moexipril were held since the patient is\ncurrently not hypertensive. Before discharge, she was restarted\non moexepril but not diltiazem. She was also started on an\naspirin and atorvastatin before discharge.\n.\n5.  Afib:  The patient is on coumadin as outpatient for\nanticoagulation.  This was hold anticoagulation in case she\nrequired urgent line placement.  Her rate was easily controlled\nwith beta blocker. Before discharge, her coumadin was restarted,\nbut very cautiously as it interacts with her 2 antibiotics for\nher diverticulitis, flagyl and levofloxacin. She was advised to\nhave her INR followed carefully and her warfarin titrated as\nneeded for an INR [**1-17**].\n.\n6.  CAD by hx (fixed perfusion defect) but clean coronaries by\ncath:  The patient was continued on metoprolol but given her\ncurrent anticoagulation status and possible need for urgent line\nplacement the aspirin was held.  Her ACE inhibitor and statin\nwere initially held and re-started later in her course.\n\nMedications on Admission:\n1.  Metoprolol 150mg TID\n2.  Diltiazem 360mg once daily\n3.  Glipizide 10mg [**Hospital1 **]\n4.  Coumadin 2mg once daily\n5.  Sevelamer 800mg TID\n6.  Moexipril 7.5mg once daily\n7.  Flagyl (completed course on [**2164-10-20**])\n\n\nDischarge Medications:\n1. Warfarin Sodium 2 mg Tablet Sig: One (1) Tablet PO HS (at\nbedtime).\n2. Moexipril HCl 7.5 mg Tablet Sig: One (1) Tablet PO DAILY\n(Daily).\n3. Aspirin 325 mg Tablet Sig: One (1) Tablet PO DAILY (Daily).\n4. Sevelamer HCl 800 mg Tablet Sig: One (1) Tablet PO TID (3\ntimes a day).\n5. Vancomycin HCl 10 g Recon Soln Sig: One (1) Recon Soln\nIntravenous  QHD (each hemodialysis).\n6. Levofloxacin 250 mg Tablet Sig: One (1) Tablet PO Q48H (every\n48 hours) for 14 days.\nDisp:*7 Tablet(s)* Refills:*0*\n7. Metronidazole 500 mg Tablet Sig: One (1) Tablet PO TID (3\ntimes a day) for 14 days.\nDisp:*42 Tablet(s)* Refills:*0*\n8. Atorvastatin Calcium 20 mg Tablet Sig: One (1) Tablet PO\nDAILY (Daily).\n9. Docusate Sodium 100 mg Capsule Sig: One (1) Capsule PO BID (2\ntimes a day).\n10. Pantoprazole Sodium 40 mg Tablet, Delayed Release (E.C.)\nSig: One (1) Tablet, Delayed Release (E.C.) PO Q24H (every 24\nhours).\n11. Metoprolol Tartrate 50 mg Tablet Sig: Three (3) Tablet PO\nTID (3 times a day).\n12. Glipizide 10 mg Tablet Sig: One (1) Tablet PO twice a day.\n13. comode  Sig: One (1)   as needed.\n14. hospital bed\n1 bed for patient with CHF\n15. commode\n1 commode for patient with CHF\n16. shower chair\n1 shower chair for patient with CHF\n17. wheelchair\n1 wheelchair for patient with CHF\n18. Vancocin HCl 1,000 mg Recon Soln Sig: One (1)  Intravenous\nQHD prn level < 15 for 7 days.\n19. pulse oximetry\nplease use for overnight oximetry on room air and record each\nmorning.\n\n\nDischarge Disposition:\nHome With Service\n\nFacility:\n[**Company 1519**]\n\nDischarge Diagnosis:\ndiverticulitis\nchronic renal insufficiency with HD line sepsis\nanemia\nCHF\ndiabetes\nCAD\natrial fibrillation\nrecurrent GIB\ncolonic ulcers\ngout\nc.diff pancolitis\ncholecystectomy\nlaminectomy\nparotitis\nc section x 4\n\nDischarge Condition:\ngood\n\nDischarge Instructions:\nPlease restart your medications except for your diltiazem. You\nwill also be taking 2 new antibiotics for your diverticulitis.\n\nWeigh yourself every morning, [**Name8 (MD) 138**] MD if weight > 3 lbs.\nAdhere to 2 gm sodium diet\nFluid Restriction: 1500 cc per day\n\nPlease note, you should have your INR and vancomycin level\nchecked at HD on Saturday. Your medications need to be adjusted\naccordingly. You will need to get vancomycin at HD for the next\n7 days each time your level is < 15 each time it is measured. It\nshould be measured each time you go to HD.\n\nSince you will not be dialyzing until Saturday, please be\nespecially careful with your diet and avoid excess fluid and\npotassium.\n\nPlease call your doctor [**First Name (Titles) **] [**Last Name (Titles) 1676**] pain, fevers, chills,\ndiarrhea, or constipation.\n\nFollowup Instructions:\nProvider: [**Name10 (NameIs) 1344**] [**Last Name (NamePattern4) 3125**], MD Where: LM [**Hospital Unit Name 3126**] CENTER Phone:[**Telephone/Fax (1) 673**] Date/Time:[**2164-11-19**] 9:30\nProvider: [**First Name8 (NamePattern2) **] [**Name11 (NameIs) **], [**Name Initial (NameIs) **].D. Where: [**Hospital6 29**] [**Hospital **] Phone:[**Telephone/Fax (1) 250**] Date/Time:[**2164-12-5**] 1:30\nProvider: [**Name10 (NameIs) **],[**Name11 (NameIs) **] TRANSPLANT SOCIAL WORK Where:\nTRANSPLANT SOCIAL WORK Date/Time:[**2165-1-7**] 1:00\nPlease call your PCP: [**Name10 (NameIs) **],[**Name11 (NameIs) **] [**Name Initial (NameIs) **]. [**Telephone/Fax (1) 18145**] for an\nappointment right after [**Holiday 1451**].\n\nPlease note, you should have your INR and vancomycin level\nchecked at HD. Your medications need to be adjusted accordingly,\neg. you should receive 1000 mg of vancomycin for a level less\nthan 15 and you should increase your warfarin if the INR is less\nthan 2 and decrease it if the level is greater than 3. Your\nwarfarin level will need to be checked 2-3 times per week while\nyou are on the metronidazole and levofloxacin because these\nantibiotics will increase your INR.\n\n* you were vaccinated with the pneumococcal vaccine but not the\ninfuenza vaccine\n\n\n"
          };
        this.setState({
            text : responseJson.text
        });
  


        let annotation_value = [];
        let responseJson1=[
            {
              "label": {
                "diag": {
                  "name": "A00",
                  "desc": "Cholera",
                  "id": 62431
                },
                "id": 115,
                "status": 1
              },
              "status": 1,
              "initial_offset": 1,
              "final_offset": 10,
              "id": 261
            },
            {
              "label": {
                "diag": {
                  "name": "A00",
                  "desc": "Cholera",
                  "id": 62431
                },
                "id": 115,
                "status": 1
              },
              "status": 1,
              "initial_offset": 25,
              "final_offset": 50,
              "id": 262
            },
            {
              "label": {
                "diag": {
                  "name": "A00.0",
                  "desc": "Cholera due to Vibrio cholerae 01, biovar cholerae",
                  "id": 62432
                },
                "id": 114,
                "status": 1
              },
              "status": 1,
              "initial_offset": 22,
              "final_offset": 65,
              "id": 265
            }
          ];
        responseJson1.map((item,index) => {
          let label='';
          if(item.label)
          {
            label=item.label.diag;
          }
          let obj ={start:item.initial_offset, end: item.final_offset, tag:'Person','label':label,'status':item.status,'label_status':0};
          annotation_value.push(obj);
          return 1;
        });
      this.setState({
          value:annotation_value
      });
  
    }
   Split = props => {
    if (props.mark){ 
      let StyleData={};
      if(props.status===1)
      {
        StyleData={
          paddingRight: '13px',
          background: '#ffd49c'
        }
      }
      else if(props.status===2)
      {
        StyleData={
          border: '2px solid #319e39',
          background:'none'
        }
      }
      else 
      {
        StyleData={ color:'red' }
      }
  
        return(
                <mark
      style={StyleData}
      data-start={props.start}
      data-end={props.end}
      onClick={() => props.onClick({start: props.start, end: props.end})}>
      {props.content}
      <i className="close_icon">&#10005;</i>
            </mark>
        )
      }
  
    return (
      <span
        data-start={props.start}
        data-end={props.end}
        onClick={() => props.onClick({start: props.start, end: props.end})}
      >
        {props.content}
        
      </span>
    )
  }
  splitWithOffsets = (text, offsets) => {
    let lastEnd = 0
    const splits = [];
    for (let offset of sortBy(offsets, o => o.start)) {
      const {start, end,status} = offset
      if (lastEnd < start) {
        splits.push({
          start: lastEnd,
          end: start,
          content: text.slice(lastEnd, start),
          status:status,
        })
      }
      splits.push({
        ...offset,
        mark: true,
        content: text.slice(start, end),
      })
      lastEnd = end
    }
    if (lastEnd < text.length) {
      splits.push({
        start: lastEnd,
        end: text.length,
        content: text.slice(lastEnd, text.length),
      })
    }
  
    return splits
  }
  handleSplitClick = (event) => {
     
      const splitIndex = this.state.value.findIndex(s => s.start === event.start && s.end === event.end)
      if (splitIndex >= 0) {
        let arr=this.state.value;
        arr.splice(splitIndex, 1);
        this.setState({ value: arr });
      }
    }
    handleMouseUp = (props) => {
     // if (!props.onChange) return
  
      const selection = window.getSelection()
  
      if (this.selectionIsEmpty(selection)) return
  
      let start =
        parseInt(selection.anchorNode.parentElement.getAttribute('data-start'), 10) +
        selection.anchorOffset
      let end =
        parseInt(selection.focusNode.parentElement.getAttribute('data-start'), 10) +
        selection.focusOffset
  
      if (this.selectionIsBackwards(selection)) {
        ;[start, end] = [end, start]
      }
  
  let data={start:start, end:end, tag: this.state.text.slice(start, end),'label':'','status':1,'label_status':1};
  this.setState({ value: [...this.state.value, data] });
  //    props.onChange([...this.state.value, this.getSpan({start, end, text: this.state.text.slice(start, end)})])
  
      window.getSelection().empty()
    }
   selectionIsEmpty = (selection) => {
    let position = selection.anchorNode.compareDocumentPosition(selection.focusNode)
  
    return position === 0 && selection.focusOffset === selection.anchorOffset
  }
  selectionIsBackwards = (selection) => {
    if (this.selectionIsEmpty(selection)) return false
  
    let position = selection.anchorNode.compareDocumentPosition(selection.focusNode)
  
    let backward = false
    if (
      (!position && selection.anchorOffset > selection.focusOffset) ||
      position === Node.DOCUMENT_POSITION_PRECEDING
    )
      backward = true
  
    return backward
  }
  getSpan = (props,span) => {
      // TODO: Better typings here.
      if (props.getSpan) return props.getSpan(span)
    //return {start: span.start, end: span.end}
    }
    enterPressed(event) {
      var code = event.keyCode || event.which;
      if(code === 13) { //13 is the enter keycode
          if(this.state.tag!=='')
          {
            
          }
      } 
   }
   
    render() {
        let splits = this.splitWithOffsets(this.state.text,this.state.value);
      return (
        <div className="row"> 
         <div className="col-sm-8">
         <Card className="pl-1 pt-1 pr-1 pb-1">  
          <div className="change_line" onMouseUp={this.handleMouseUp}>
            {splits.length>0 && splits.map(split => (
              <this.Split key={`${split.start}-${split.end}`} {...split}  onClick={this.handleSplitClick}/>
            ))}
          </div> 
          </Card>
         </div>
         <div className="col-sm-4">
        <div className="row">
          <div className="col-sm-12 text-right">
          <label className="switch">
              <input type="checkbox"  />
              <span className="slider round"></span>    
          </label>
          </div>
        </div>
         {this.state.value.map((item,index)=>{
          let text='';
          if(item.label!=='') {
          if(item.label_status===0){
          text=<div key={index} className="row">
          <div className="col-sm-3">
          <button className="btn btn-sm annotation_tag">{item.label.name}</button>
          </div>
          <div className="col-sm-9 pt-1">
            <p><span className="annotation_description">{item.label.desc}</span></p>
          </div>
        </div>;
        } }  else { 
          text=<div className="row" key={index}>
          <div className="col-sm-3 pt-1">
            <input type="text" name="tag" onChange={this.handleTagChange} onKeyPress={this.enterPressed.bind(this)} class="tag_field" />
          </div>
          <div className="col-sm-9 pt-1">
            <input type="text" class="description_field" />
          </div>
        </div>;
        } return (text);})}
        </div>
         </div>
      )
    }
  }

describe("ReportDetails component", () => {
  test("Matches the snapshot", () => {
    const reportdetails = create(<ReportDetails />);
    expect(reportdetails.toJSON()).toMatchSnapshot();
  });
});