import React,{ useState,useEffect } from "react";
import { create } from "react-test-renderer";
import { Link } from 'react-router-dom';
import {  Row, Col, Card, CardBody} from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { columns } from '../components/data';
import Header from '../components/Header';
import { useAuth0 } from "@auth0/auth0-react"; 
import config from "../auth_config.json";
const { SearchBar } = Search;
const { ExportCSVButton } = CSVExport;
const Discharges = (props) => {
    const [discharges_data, setData] = useState([]);
    const { getAccessTokenSilently } = useAuth0();
    useEffect(()=>{
      let responseJson=[
        {
          "id": 1,
          "patient": {
            "id": 1,
            "subject_id": 10006,
            "gender": "F",
            "dob": "2094-03-05T00:00:00Z",
            "dod": "2165-08-12T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2165-08-12T00:00:00Z"
          },
          "hadm_id": 142345,
          "admittime": "2164-10-23T21:09:00Z",
          "dischtime": "2164-11-01T17:15:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 2,
          "patient": {
            "id": 2,
            "subject_id": 10011,
            "gender": "F",
            "dob": "2090-06-05T00:00:00Z",
            "dod": "2126-08-28T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2126-08-28T00:00:00Z"
          },
          "hadm_id": 105331,
          "admittime": "2126-08-14T22:32:00Z",
          "dischtime": "2126-08-28T18:59:00Z",
          "deathtime": "2126-08-28T18:59:00Z",
          "admission_type": "EMERGENCY"
        },
        {
          "id": 3,
          "patient": {
            "id": 3,
            "subject_id": 10013,
            "gender": "F",
            "dob": "2038-09-03T00:00:00Z",
            "dod": "2125-10-07T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2125-10-07T00:00:00Z"
          },
          "hadm_id": 165520,
          "admittime": "2125-10-04T23:36:00Z",
          "dischtime": "2125-10-07T15:13:00Z",
          "deathtime": "2125-10-07T15:13:00Z",
          "admission_type": "EMERGENCY"
        },
        {
          "id": 4,
          "patient": {
            "id": 4,
            "subject_id": 10017,
            "gender": "F",
            "dob": "2075-09-21T00:00:00Z",
            "dod": "2152-09-12T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": null
          },
          "hadm_id": 199207,
          "admittime": "2149-05-26T17:19:00Z",
          "dischtime": "2149-06-03T18:42:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 5,
          "patient": {
            "id": 5,
            "subject_id": 10019,
            "gender": "M",
            "dob": "2114-06-20T00:00:00Z",
            "dod": "2163-05-15T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2163-05-15T00:00:00Z"
          },
          "hadm_id": 177759,
          "admittime": "2163-05-14T20:43:00Z",
          "dischtime": "2163-05-15T12:00:00Z",
          "deathtime": "2163-05-15T12:00:00Z",
          "admission_type": "EMERGENCY"
        },
        {
          "id": 6,
          "patient": {
            "id": 6,
            "subject_id": 10026,
            "gender": "F",
            "dob": "1895-05-17T00:00:00Z",
            "dod": "2195-11-24T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": null
          },
          "hadm_id": 103770,
          "admittime": "2195-05-17T07:39:00Z",
          "dischtime": "2195-05-24T11:45:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 7,
          "patient": {
            "id": 7,
            "subject_id": 10027,
            "gender": "F",
            "dob": "2108-01-15T00:00:00Z",
            "dod": "2190-09-14T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": null
          },
          "hadm_id": 199395,
          "admittime": "2190-07-13T07:15:00Z",
          "dischtime": "2190-07-25T14:00:00Z",
          "deathtime": null,
          "admission_type": "ELECTIVE"
        },
        {
          "id": 8,
          "patient": {
            "id": 8,
            "subject_id": 10029,
            "gender": "M",
            "dob": "2061-04-10T00:00:00Z",
            "dod": "2140-09-21T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": null
          },
          "hadm_id": 132349,
          "admittime": "2139-09-22T10:58:00Z",
          "dischtime": "2139-10-02T14:29:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 9,
          "patient": {
            "id": 9,
            "subject_id": 10032,
            "gender": "M",
            "dob": "2050-03-29T00:00:00Z",
            "dod": "2138-05-21T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2138-05-21T00:00:00Z"
          },
          "hadm_id": 140372,
          "admittime": "2138-04-02T19:52:00Z",
          "dischtime": "2138-04-15T14:35:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 10,
          "patient": {
            "id": 10,
            "subject_id": 10033,
            "gender": "F",
            "dob": "2051-04-21T00:00:00Z",
            "dod": "2133-09-09T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": null
          },
          "hadm_id": 157235,
          "admittime": "2132-12-05T02:46:00Z",
          "dischtime": "2132-12-08T15:15:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 11,
          "patient": {
            "id": 11,
            "subject_id": 10035,
            "gender": "M",
            "dob": "2053-04-13T00:00:00Z",
            "dod": "2133-03-30T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": null
          },
          "hadm_id": 110244,
          "admittime": "2129-03-03T16:06:00Z",
          "dischtime": "2129-03-07T18:19:00Z",
          "deathtime": null,
          "admission_type": "ELECTIVE"
        },
        {
          "id": 12,
          "patient": {
            "id": 12,
            "subject_id": 10036,
            "gender": "F",
            "dob": "1885-03-24T00:00:00Z",
            "dod": "2185-03-26T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2185-03-26T00:00:00Z"
          },
          "hadm_id": 189483,
          "admittime": "2185-03-24T16:56:00Z",
          "dischtime": "2185-03-26T09:15:00Z",
          "deathtime": "2185-03-26T09:15:00Z",
          "admission_type": "EMERGENCY"
        },
        {
          "id": 13,
          "patient": {
            "id": 13,
            "subject_id": 10038,
            "gender": "F",
            "dob": "2056-01-27T00:00:00Z",
            "dod": "2147-03-17T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2147-03-17T00:00:00Z"
          },
          "hadm_id": 111115,
          "admittime": "2144-02-09T17:53:00Z",
          "dischtime": "2144-02-21T13:30:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 14,
          "patient": {
            "id": 14,
            "subject_id": 10040,
            "gender": "F",
            "dob": "2061-10-23T00:00:00Z",
            "dod": "2150-09-05T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2150-09-05T00:00:00Z"
          },
          "hadm_id": 157839,
          "admittime": "2147-02-23T11:43:00Z",
          "dischtime": "2147-02-27T16:19:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 15,
          "patient": {
            "id": 15,
            "subject_id": 10042,
            "gender": "M",
            "dob": "2076-05-06T00:00:00Z",
            "dod": "2150-12-03T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": null
          },
          "hadm_id": 148562,
          "admittime": "2147-02-06T12:38:00Z",
          "dischtime": "2147-02-17T19:00:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 16,
          "patient": {
            "id": 16,
            "subject_id": 10043,
            "gender": "M",
            "dob": "2109-04-07T00:00:00Z",
            "dod": "2191-02-07T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": null
          },
          "hadm_id": 168674,
          "admittime": "2185-04-14T00:23:00Z",
          "dischtime": "2185-04-26T18:20:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 17,
          "patient": {
            "id": 17,
            "subject_id": 10044,
            "gender": "F",
            "dob": "2071-02-11T00:00:00Z",
            "dod": "2152-10-20T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2152-10-20T00:00:00Z"
          },
          "hadm_id": 124073,
          "admittime": "2152-10-02T16:24:00Z",
          "dischtime": "2152-10-11T15:42:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 18,
          "patient": {
            "id": 18,
            "subject_id": 10045,
            "gender": "F",
            "dob": "2061-03-25T00:00:00Z",
            "dod": "2129-12-01T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2129-12-01T00:00:00Z"
          },
          "hadm_id": 126949,
          "admittime": "2129-11-24T00:31:00Z",
          "dischtime": "2129-12-01T01:45:00Z",
          "deathtime": "2129-12-01T01:45:00Z",
          "admission_type": "EMERGENCY"
        },
        {
          "id": 19,
          "patient": {
            "id": 19,
            "subject_id": 10046,
            "gender": "F",
            "dob": "2141-03-15T00:00:00Z",
            "dod": "2195-03-13T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": null
          },
          "hadm_id": 133110,
          "admittime": "2194-07-26T23:43:00Z",
          "dischtime": "2194-08-06T15:12:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 20,
          "patient": {
            "id": 20,
            "subject_id": 10056,
            "gender": "F",
            "dob": "2046-02-27T00:00:00Z",
            "dod": "2129-09-16T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": null
          },
          "hadm_id": 100375,
          "admittime": "2129-05-02T00:12:00Z",
          "dischtime": "2129-05-06T13:40:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 21,
          "patient": {
            "id": 21,
            "subject_id": 10059,
            "gender": "M",
            "dob": "2081-01-03T00:00:00Z",
            "dod": "2150-08-29T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2150-08-29T00:00:00Z"
          },
          "hadm_id": 142582,
          "admittime": "2150-08-07T21:40:00Z",
          "dischtime": "2150-08-13T11:33:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 22,
          "patient": {
            "id": 21,
            "subject_id": 10059,
            "gender": "M",
            "dob": "2081-01-03T00:00:00Z",
            "dod": "2150-08-29T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2150-08-29T00:00:00Z"
          },
          "hadm_id": 122098,
          "admittime": "2150-08-22T17:33:00Z",
          "dischtime": "2150-08-29T18:20:00Z",
          "deathtime": "2150-08-29T18:20:00Z",
          "admission_type": "EMERGENCY"
        },
        {
          "id": 23,
          "patient": {
            "id": 22,
            "subject_id": 10061,
            "gender": "F",
            "dob": "2031-05-19T00:00:00Z",
            "dod": "2108-04-03T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": null
          },
          "hadm_id": 145203,
          "admittime": "2107-01-16T11:33:00Z",
          "dischtime": "2107-02-10T11:30:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 24,
          "patient": {
            "id": 23,
            "subject_id": 10064,
            "gender": "M",
            "dob": "2058-04-23T00:00:00Z",
            "dod": "2127-03-19T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2127-03-19T00:00:00Z"
          },
          "hadm_id": 111761,
          "admittime": "2127-03-19T14:39:00Z",
          "dischtime": "2127-03-19T18:09:00Z",
          "deathtime": "2127-03-19T18:09:00Z",
          "admission_type": "EMERGENCY"
        },
        {
          "id": 25,
          "patient": {
            "id": 24,
            "subject_id": 10065,
            "gender": "F",
            "dob": "2111-07-18T00:00:00Z",
            "dod": "2193-11-06T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2193-11-06T00:00:00Z"
          },
          "hadm_id": 183314,
          "admittime": "2189-09-08T07:15:00Z",
          "dischtime": "2189-09-20T14:00:00Z",
          "deathtime": null,
          "admission_type": "ELECTIVE"
        },
        {
          "id": 26,
          "patient": {
            "id": 25,
            "subject_id": 10067,
            "gender": "M",
            "dob": "2101-06-10T00:00:00Z",
            "dod": "2130-10-06T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2130-10-06T00:00:00Z"
          },
          "hadm_id": 160442,
          "admittime": "2130-10-06T01:34:00Z",
          "dischtime": "2130-10-06T02:29:00Z",
          "deathtime": "2130-10-06T02:29:00Z",
          "admission_type": "EMERGENCY"
        },
        {
          "id": 27,
          "patient": {
            "id": 26,
            "subject_id": 10069,
            "gender": "F",
            "dob": "2146-10-23T00:00:00Z",
            "dod": "2188-02-27T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2188-02-27T00:00:00Z"
          },
          "hadm_id": 146672,
          "admittime": "2188-02-08T11:15:00Z",
          "dischtime": "2188-02-27T18:41:00Z",
          "deathtime": "2188-02-27T18:41:00Z",
          "admission_type": "EMERGENCY"
        },
        {
          "id": 28,
          "patient": {
            "id": 27,
            "subject_id": 10074,
            "gender": "M",
            "dob": "2081-12-26T00:00:00Z",
            "dod": "2167-04-24T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": null
          },
          "hadm_id": 170119,
          "admittime": "2167-02-11T22:10:00Z",
          "dischtime": "2167-02-19T15:30:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 29,
          "patient": {
            "id": 28,
            "subject_id": 10076,
            "gender": "M",
            "dob": "2038-05-10T00:00:00Z",
            "dod": "2107-03-30T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2107-03-30T00:00:00Z"
          },
          "hadm_id": 198503,
          "admittime": "2107-03-21T21:16:00Z",
          "dischtime": "2107-03-30T12:00:00Z",
          "deathtime": "2107-03-30T12:00:00Z",
          "admission_type": "EMERGENCY"
        },
        {
          "id": 30,
          "patient": {
            "id": 29,
            "subject_id": 10083,
            "gender": "F",
            "dob": "2110-03-25T00:00:00Z",
            "dod": "2192-12-12T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": null
          },
          "hadm_id": 134993,
          "admittime": "2192-11-20T04:34:00Z",
          "dischtime": "2192-12-07T16:30:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 31,
          "patient": {
            "id": 30,
            "subject_id": 10088,
            "gender": "M",
            "dob": "2029-07-09T00:00:00Z",
            "dod": "2107-07-20T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": null
          },
          "hadm_id": 169938,
          "admittime": "2107-01-04T11:59:00Z",
          "dischtime": "2107-01-11T15:45:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 32,
          "patient": {
            "id": 30,
            "subject_id": 10088,
            "gender": "M",
            "dob": "2029-07-09T00:00:00Z",
            "dod": "2107-07-20T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": null
          },
          "hadm_id": 168233,
          "admittime": "2107-01-29T04:00:00Z",
          "dischtime": "2107-02-10T12:00:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 33,
          "patient": {
            "id": 30,
            "subject_id": 10088,
            "gender": "M",
            "dob": "2029-07-09T00:00:00Z",
            "dod": "2107-07-20T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": null
          },
          "hadm_id": 149044,
          "admittime": "2107-05-12T18:00:00Z",
          "dischtime": "2107-05-18T13:30:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 34,
          "patient": {
            "id": 31,
            "subject_id": 10089,
            "gender": "M",
            "dob": "2046-04-18T00:00:00Z",
            "dod": "2132-08-08T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2132-08-08T00:00:00Z"
          },
          "hadm_id": 190301,
          "admittime": "2132-08-05T18:48:00Z",
          "dischtime": "2132-08-08T02:15:00Z",
          "deathtime": "2132-08-08T02:15:00Z",
          "admission_type": "EMERGENCY"
        },
        {
          "id": 35,
          "patient": {
            "id": 32,
            "subject_id": 10090,
            "gender": "M",
            "dob": "2096-02-27T00:00:00Z",
            "dod": "2126-04-06T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": null
          },
          "hadm_id": 176805,
          "admittime": "2124-01-12T14:26:00Z",
          "dischtime": "2124-01-14T19:00:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 36,
          "patient": {
            "id": 33,
            "subject_id": 10093,
            "gender": "M",
            "dob": "2053-09-08T00:00:00Z",
            "dod": "2141-01-26T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2141-01-26T00:00:00Z"
          },
          "hadm_id": 165393,
          "admittime": "2141-01-25T08:35:00Z",
          "dischtime": "2141-01-26T03:05:00Z",
          "deathtime": "2141-01-26T03:05:00Z",
          "admission_type": "EMERGENCY"
        },
        {
          "id": 37,
          "patient": {
            "id": 34,
            "subject_id": 10094,
            "gender": "M",
            "dob": "1880-02-29T00:00:00Z",
            "dod": "2180-03-20T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2180-03-20T00:00:00Z"
          },
          "hadm_id": 168074,
          "admittime": "2180-02-29T18:54:00Z",
          "dischtime": "2180-03-10T17:35:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 38,
          "patient": {
            "id": 34,
            "subject_id": 10094,
            "gender": "M",
            "dob": "1880-02-29T00:00:00Z",
            "dod": "2180-03-20T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2180-03-20T00:00:00Z"
          },
          "hadm_id": 122928,
          "admittime": "2180-03-15T22:35:00Z",
          "dischtime": "2180-03-20T18:00:00Z",
          "deathtime": "2180-03-20T18:00:00Z",
          "admission_type": "EMERGENCY"
        },
        {
          "id": 39,
          "patient": {
            "id": 35,
            "subject_id": 10098,
            "gender": "F",
            "dob": "2150-12-07T00:00:00Z",
            "dod": "2170-12-03T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2170-12-03T00:00:00Z"
          },
          "hadm_id": 180685,
          "admittime": "2170-12-02T23:24:00Z",
          "dischtime": "2170-12-03T15:55:00Z",
          "deathtime": "2170-12-03T15:55:00Z",
          "admission_type": "EMERGENCY"
        },
        {
          "id": 40,
          "patient": {
            "id": 36,
            "subject_id": 10101,
            "gender": "M",
            "dob": "2055-07-18T00:00:00Z",
            "dod": "2128-03-24T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2128-03-24T00:00:00Z"
          },
          "hadm_id": 142539,
          "admittime": "2128-03-22T17:37:00Z",
          "dischtime": "2128-03-24T19:00:00Z",
          "deathtime": "2128-03-24T19:00:00Z",
          "admission_type": "EMERGENCY"
        },
        {
          "id": 41,
          "patient": {
            "id": 37,
            "subject_id": 10102,
            "gender": "M",
            "dob": "2035-04-13T00:00:00Z",
            "dod": "2105-06-11T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2105-06-11T00:00:00Z"
          },
          "hadm_id": 164869,
          "admittime": "2105-05-29T18:18:00Z",
          "dischtime": "2105-06-11T02:20:00Z",
          "deathtime": "2105-06-11T02:20:00Z",
          "admission_type": "EMERGENCY"
        },
        {
          "id": 42,
          "patient": {
            "id": 38,
            "subject_id": 10104,
            "gender": "F",
            "dob": "2050-02-16T00:00:00Z",
            "dod": "2125-05-09T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": null
          },
          "hadm_id": 177678,
          "admittime": "2120-08-24T17:39:00Z",
          "dischtime": "2120-08-31T13:12:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 43,
          "patient": {
            "id": 39,
            "subject_id": 10106,
            "gender": "M",
            "dob": "2097-12-16T00:00:00Z",
            "dod": "2163-09-15T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": null
          },
          "hadm_id": 133283,
          "admittime": "2161-09-14T22:22:00Z",
          "dischtime": "2161-09-19T17:00:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 44,
          "patient": {
            "id": 40,
            "subject_id": 10111,
            "gender": "F",
            "dob": "2097-01-16T00:00:00Z",
            "dod": "2180-02-01T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2180-02-01T00:00:00Z"
          },
          "hadm_id": 174739,
          "admittime": "2180-01-14T18:42:00Z",
          "dischtime": "2180-02-01T17:17:00Z",
          "deathtime": "2180-02-01T17:17:00Z",
          "admission_type": "EMERGENCY"
        },
        {
          "id": 45,
          "patient": {
            "id": 41,
            "subject_id": 10112,
            "gender": "F",
            "dob": "2069-05-05T00:00:00Z",
            "dod": "2148-01-19T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2148-01-19T00:00:00Z"
          },
          "hadm_id": 188574,
          "admittime": "2148-01-13T22:32:00Z",
          "dischtime": "2148-01-19T15:03:00Z",
          "deathtime": "2148-01-19T15:03:00Z",
          "admission_type": "URGENT"
        },
        {
          "id": 46,
          "patient": {
            "id": 42,
            "subject_id": 10114,
            "gender": "F",
            "dob": "2099-03-17T00:00:00Z",
            "dod": "2178-05-02T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2178-05-02T00:00:00Z"
          },
          "hadm_id": 167957,
          "admittime": "2171-10-30T19:03:00Z",
          "dischtime": "2171-11-06T14:59:00Z",
          "deathtime": null,
          "admission_type": "URGENT"
        },
        {
          "id": 47,
          "patient": {
            "id": 43,
            "subject_id": 10117,
            "gender": "F",
            "dob": "2072-05-05T00:00:00Z",
            "dod": "2138-11-18T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2138-11-18T00:00:00Z"
          },
          "hadm_id": 187023,
          "admittime": "2138-06-05T17:23:00Z",
          "dischtime": "2138-06-11T10:16:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 48,
          "patient": {
            "id": 43,
            "subject_id": 10117,
            "gender": "F",
            "dob": "2072-05-05T00:00:00Z",
            "dod": "2138-11-18T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2138-11-18T00:00:00Z"
          },
          "hadm_id": 105150,
          "admittime": "2138-11-09T18:08:00Z",
          "dischtime": "2138-11-18T23:13:00Z",
          "deathtime": "2138-11-18T23:13:00Z",
          "admission_type": "EMERGENCY"
        },
        {
          "id": 49,
          "patient": {
            "id": 44,
            "subject_id": 10119,
            "gender": "M",
            "dob": "2036-03-10T00:00:00Z",
            "dod": "2120-09-18T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": null
          },
          "hadm_id": 157466,
          "admittime": "2117-08-05T18:27:00Z",
          "dischtime": "2117-08-19T16:15:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 50,
          "patient": {
            "id": 44,
            "subject_id": 10119,
            "gender": "M",
            "dob": "2036-03-10T00:00:00Z",
            "dod": "2120-09-18T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": null
          },
          "hadm_id": 165436,
          "admittime": "2117-08-21T06:58:00Z",
          "dischtime": "2117-08-26T13:00:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 51,
          "patient": {
            "id": 45,
            "subject_id": 10120,
            "gender": "M",
            "dob": "2088-05-05T00:00:00Z",
            "dod": "2115-05-15T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2115-05-15T00:00:00Z"
          },
          "hadm_id": 193924,
          "admittime": "2115-05-12T14:52:00Z",
          "dischtime": "2115-05-15T02:15:00Z",
          "deathtime": "2115-05-15T02:15:00Z",
          "admission_type": "EMERGENCY"
        },
        {
          "id": 52,
          "patient": {
            "id": 46,
            "subject_id": 10124,
            "gender": "F",
            "dob": "2108-12-20T00:00:00Z",
            "dod": "2192-05-15T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2192-05-15T00:00:00Z"
          },
          "hadm_id": 182664,
          "admittime": "2192-03-26T15:30:00Z",
          "dischtime": "2192-04-05T14:21:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 53,
          "patient": {
            "id": 46,
            "subject_id": 10124,
            "gender": "F",
            "dob": "2108-12-20T00:00:00Z",
            "dod": "2192-05-15T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2192-05-15T00:00:00Z"
          },
          "hadm_id": 170883,
          "admittime": "2192-04-16T20:57:00Z",
          "dischtime": "2192-05-15T19:28:00Z",
          "deathtime": "2192-05-15T19:28:00Z",
          "admission_type": "EMERGENCY"
        },
        {
          "id": 54,
          "patient": {
            "id": 47,
            "subject_id": 10126,
            "gender": "F",
            "dob": "2127-06-04T00:00:00Z",
            "dod": "2171-08-16T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2171-08-16T00:00:00Z"
          },
          "hadm_id": 160445,
          "admittime": "2171-07-12T06:02:00Z",
          "dischtime": "2171-08-16T12:00:00Z",
          "deathtime": "2171-08-16T12:00:00Z",
          "admission_type": "EMERGENCY"
        },
        {
          "id": 55,
          "patient": {
            "id": 48,
            "subject_id": 10127,
            "gender": "F",
            "dob": "2181-04-19T00:00:00Z",
            "dod": "2201-11-08T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": null
          },
          "hadm_id": 182839,
          "admittime": "2198-06-28T05:34:00Z",
          "dischtime": "2198-07-20T14:56:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 56,
          "patient": {
            "id": 49,
            "subject_id": 10130,
            "gender": "M",
            "dob": "2109-07-08T00:00:00Z",
            "dod": "2161-03-13T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2161-03-13T00:00:00Z"
          },
          "hadm_id": 156668,
          "admittime": "2161-01-30T16:26:00Z",
          "dischtime": "2161-02-19T14:05:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 57,
          "patient": {
            "id": 50,
            "subject_id": 10132,
            "gender": "F",
            "dob": "2058-04-23T00:00:00Z",
            "dod": "2123-11-06T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2123-11-06T00:00:00Z"
          },
          "hadm_id": 197611,
          "admittime": "2123-08-23T20:00:00Z",
          "dischtime": "2123-09-17T14:00:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 58,
          "patient": {
            "id": 51,
            "subject_id": 40124,
            "gender": "F",
            "dob": "2063-07-05T00:00:00Z",
            "dod": "2130-11-03T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2130-11-03T00:00:00Z"
          },
          "hadm_id": 126179,
          "admittime": "2130-02-04T02:26:00Z",
          "dischtime": "2130-02-10T17:39:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 59,
          "patient": {
            "id": 51,
            "subject_id": 40124,
            "gender": "F",
            "dob": "2063-07-05T00:00:00Z",
            "dod": "2130-11-03T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2130-11-03T00:00:00Z"
          },
          "hadm_id": 146893,
          "admittime": "2130-08-12T05:49:00Z",
          "dischtime": "2130-08-18T15:30:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 60,
          "patient": {
            "id": 52,
            "subject_id": 40177,
            "gender": "M",
            "dob": "2082-06-27T00:00:00Z",
            "dod": "2169-05-12T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2169-05-12T00:00:00Z"
          },
          "hadm_id": 198480,
          "admittime": "2169-05-06T23:16:00Z",
          "dischtime": "2169-05-12T08:54:00Z",
          "deathtime": "2169-05-12T08:54:00Z",
          "admission_type": "EMERGENCY"
        },
        {
          "id": 61,
          "patient": {
            "id": 53,
            "subject_id": 40204,
            "gender": "M",
            "dob": "2079-08-17T00:00:00Z",
            "dod": "2156-02-08T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2156-02-08T00:00:00Z"
          },
          "hadm_id": 175237,
          "admittime": "2155-12-16T16:20:00Z",
          "dischtime": "2155-12-24T14:39:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 62,
          "patient": {
            "id": 54,
            "subject_id": 40277,
            "gender": "F",
            "dob": "2070-10-11T00:00:00Z",
            "dod": "2154-01-22T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": null
          },
          "hadm_id": 127703,
          "admittime": "2151-08-13T02:23:00Z",
          "dischtime": "2151-08-17T19:00:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 63,
          "patient": {
            "id": 55,
            "subject_id": 40286,
            "gender": "F",
            "dob": "2110-04-02T00:00:00Z",
            "dod": "2196-10-22T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": null
          },
          "hadm_id": 109698,
          "admittime": "2193-10-15T07:15:00Z",
          "dischtime": "2193-10-20T13:18:00Z",
          "deathtime": null,
          "admission_type": "ELECTIVE"
        },
        {
          "id": 64,
          "patient": {
            "id": 56,
            "subject_id": 40304,
            "gender": "M",
            "dob": "2086-12-16T00:00:00Z",
            "dod": "2165-01-17T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2165-01-17T00:00:00Z"
          },
          "hadm_id": 174997,
          "admittime": "2163-11-21T18:34:00Z",
          "dischtime": "2163-12-01T11:00:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 65,
          "patient": {
            "id": 57,
            "subject_id": 40310,
            "gender": "M",
            "dob": "2103-12-05T00:00:00Z",
            "dod": "2144-12-31T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2144-12-31T00:00:00Z"
          },
          "hadm_id": 186361,
          "admittime": "2144-07-11T15:02:00Z",
          "dischtime": "2144-11-12T14:40:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 66,
          "patient": {
            "id": 57,
            "subject_id": 40310,
            "gender": "M",
            "dob": "2103-12-05T00:00:00Z",
            "dod": "2144-12-31T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2144-12-31T00:00:00Z"
          },
          "hadm_id": 157609,
          "admittime": "2144-12-24T16:16:00Z",
          "dischtime": "2144-12-31T16:40:00Z",
          "deathtime": "2144-12-31T16:40:00Z",
          "admission_type": "EMERGENCY"
        },
        {
          "id": 67,
          "patient": {
            "id": 58,
            "subject_id": 40456,
            "gender": "F",
            "dob": "2031-08-12T00:00:00Z",
            "dod": "2120-08-13T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": null
          },
          "hadm_id": 161765,
          "admittime": "2118-10-06T16:25:00Z",
          "dischtime": "2118-10-09T13:30:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 68,
          "patient": {
            "id": 59,
            "subject_id": 40503,
            "gender": "F",
            "dob": "2097-11-14T00:00:00Z",
            "dod": "2186-07-07T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2186-07-07T00:00:00Z"
          },
          "hadm_id": 168803,
          "admittime": "2186-07-06T19:59:00Z",
          "dischtime": "2186-07-07T19:00:00Z",
          "deathtime": "2186-07-07T19:00:00Z",
          "admission_type": "EMERGENCY"
        },
        {
          "id": 69,
          "patient": {
            "id": 60,
            "subject_id": 40595,
            "gender": "F",
            "dob": "2068-03-04T00:00:00Z",
            "dod": "2144-10-31T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2144-10-31T00:00:00Z"
          },
          "hadm_id": 116518,
          "admittime": "2144-10-15T10:46:00Z",
          "dischtime": "2144-10-24T09:00:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 70,
          "patient": {
            "id": 61,
            "subject_id": 40601,
            "gender": "F",
            "dob": "2112-01-20T00:00:00Z",
            "dod": "2184-08-26T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": null
          },
          "hadm_id": 182879,
          "admittime": "2184-08-04T05:44:00Z",
          "dischtime": "2184-08-10T15:30:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 71,
          "patient": {
            "id": 62,
            "subject_id": 40612,
            "gender": "F",
            "dob": "2073-08-13T00:00:00Z",
            "dod": "2159-11-25T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": null
          },
          "hadm_id": 104697,
          "admittime": "2159-11-17T03:28:00Z",
          "dischtime": "2159-11-22T14:15:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 72,
          "patient": {
            "id": 63,
            "subject_id": 40655,
            "gender": "F",
            "dob": "1844-07-18T00:00:00Z",
            "dod": "2145-03-07T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2145-03-07T00:00:00Z"
          },
          "hadm_id": 126002,
          "admittime": "2144-07-18T19:32:00Z",
          "dischtime": "2144-07-28T14:41:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 73,
          "patient": {
            "id": 64,
            "subject_id": 40687,
            "gender": "F",
            "dob": "2073-06-05T00:00:00Z",
            "dod": "2155-03-12T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2155-03-12T00:00:00Z"
          },
          "hadm_id": 129273,
          "admittime": "2155-03-08T02:35:00Z",
          "dischtime": "2155-03-11T15:00:00Z",
          "deathtime": "2155-03-12T15:00:00Z",
          "admission_type": "EMERGENCY"
        },
        {
          "id": 74,
          "patient": {
            "id": 65,
            "subject_id": 41795,
            "gender": "M",
            "dob": "2096-07-25T00:00:00Z",
            "dod": "2145-12-06T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": null
          },
          "hadm_id": 138132,
          "admittime": "2145-07-07T01:19:00Z",
          "dischtime": "2145-07-20T19:15:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 75,
          "patient": {
            "id": 65,
            "subject_id": 41795,
            "gender": "M",
            "dob": "2096-07-25T00:00:00Z",
            "dod": "2145-12-06T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": null
          },
          "hadm_id": 118192,
          "admittime": "2145-09-06T08:52:00Z",
          "dischtime": "2145-09-09T16:25:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 76,
          "patient": {
            "id": 66,
            "subject_id": 41914,
            "gender": "M",
            "dob": "2090-11-16T00:00:00Z",
            "dod": "2146-01-25T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2146-01-25T00:00:00Z"
          },
          "hadm_id": 101361,
          "admittime": "2145-12-01T18:13:00Z",
          "dischtime": "2145-12-18T17:45:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 77,
          "patient": {
            "id": 67,
            "subject_id": 41976,
            "gender": "M",
            "dob": "2136-07-28T00:00:00Z",
            "dod": "2202-12-05T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": null
          },
          "hadm_id": 125449,
          "admittime": "2198-10-29T06:54:00Z",
          "dischtime": "2198-11-05T15:20:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 78,
          "patient": {
            "id": 67,
            "subject_id": 41976,
            "gender": "M",
            "dob": "2136-07-28T00:00:00Z",
            "dod": "2202-12-05T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": null
          },
          "hadm_id": 173269,
          "admittime": "2199-01-13T17:13:00Z",
          "dischtime": "2199-01-16T15:23:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 79,
          "patient": {
            "id": 67,
            "subject_id": 41976,
            "gender": "M",
            "dob": "2136-07-28T00:00:00Z",
            "dod": "2202-12-05T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": null
          },
          "hadm_id": 176016,
          "admittime": "2199-01-31T22:26:00Z",
          "dischtime": "2199-02-14T13:22:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 80,
          "patient": {
            "id": 67,
            "subject_id": 41976,
            "gender": "M",
            "dob": "2136-07-28T00:00:00Z",
            "dod": "2202-12-05T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": null
          },
          "hadm_id": 172082,
          "admittime": "2200-03-17T20:32:00Z",
          "dischtime": "2200-03-28T17:00:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 81,
          "patient": {
            "id": 67,
            "subject_id": 41976,
            "gender": "M",
            "dob": "2136-07-28T00:00:00Z",
            "dod": "2202-12-05T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": null
          },
          "hadm_id": 152032,
          "admittime": "2200-06-09T16:14:00Z",
          "dischtime": "2200-06-13T18:10:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 82,
          "patient": {
            "id": 67,
            "subject_id": 41976,
            "gender": "M",
            "dob": "2136-07-28T00:00:00Z",
            "dod": "2202-12-05T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": null
          },
          "hadm_id": 130681,
          "admittime": "2200-10-29T20:46:00Z",
          "dischtime": "2200-11-03T18:45:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 83,
          "patient": {
            "id": 67,
            "subject_id": 41976,
            "gender": "M",
            "dob": "2136-07-28T00:00:00Z",
            "dod": "2202-12-05T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": null
          },
          "hadm_id": 180546,
          "admittime": "2201-05-12T10:49:00Z",
          "dischtime": "2201-05-19T14:04:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 84,
          "patient": {
            "id": 67,
            "subject_id": 41976,
            "gender": "M",
            "dob": "2136-07-28T00:00:00Z",
            "dod": "2202-12-05T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": null
          },
          "hadm_id": 174863,
          "admittime": "2201-08-10T23:00:00Z",
          "dischtime": "2201-08-13T16:55:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 85,
          "patient": {
            "id": 67,
            "subject_id": 41976,
            "gender": "M",
            "dob": "2136-07-28T00:00:00Z",
            "dod": "2202-12-05T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": null
          },
          "hadm_id": 125013,
          "admittime": "2201-09-28T16:47:00Z",
          "dischtime": "2201-10-01T15:53:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 86,
          "patient": {
            "id": 67,
            "subject_id": 41976,
            "gender": "M",
            "dob": "2136-07-28T00:00:00Z",
            "dod": "2202-12-05T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": null
          },
          "hadm_id": 155297,
          "admittime": "2201-11-16T23:00:00Z",
          "dischtime": "2201-11-19T16:30:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 87,
          "patient": {
            "id": 67,
            "subject_id": 41976,
            "gender": "M",
            "dob": "2136-07-28T00:00:00Z",
            "dod": "2202-12-05T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": null
          },
          "hadm_id": 179418,
          "admittime": "2201-12-31T19:19:00Z",
          "dischtime": "2202-01-03T17:55:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 88,
          "patient": {
            "id": 67,
            "subject_id": 41976,
            "gender": "M",
            "dob": "2136-07-28T00:00:00Z",
            "dod": "2202-12-05T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": null
          },
          "hadm_id": 151798,
          "admittime": "2202-02-15T19:01:00Z",
          "dischtime": "2202-02-19T16:42:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 89,
          "patient": {
            "id": 67,
            "subject_id": 41976,
            "gender": "M",
            "dob": "2136-07-28T00:00:00Z",
            "dod": "2202-12-05T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": null
          },
          "hadm_id": 145024,
          "admittime": "2202-05-01T22:00:00Z",
          "dischtime": "2202-05-04T18:42:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 90,
          "patient": {
            "id": 67,
            "subject_id": 41976,
            "gender": "M",
            "dob": "2136-07-28T00:00:00Z",
            "dod": "2202-12-05T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": null
          },
          "hadm_id": 149469,
          "admittime": "2202-09-16T21:56:00Z",
          "dischtime": "2202-09-23T16:20:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 91,
          "patient": {
            "id": 67,
            "subject_id": 41976,
            "gender": "M",
            "dob": "2136-07-28T00:00:00Z",
            "dod": "2202-12-05T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": null
          },
          "hadm_id": 153826,
          "admittime": "2202-10-03T01:45:00Z",
          "dischtime": "2202-10-11T16:30:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 92,
          "patient": {
            "id": 68,
            "subject_id": 41983,
            "gender": "F",
            "dob": "1851-09-12T00:00:00Z",
            "dod": "2151-09-15T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2151-09-15T00:00:00Z"
          },
          "hadm_id": 107689,
          "admittime": "2151-09-12T17:04:00Z",
          "dischtime": "2151-09-15T00:45:00Z",
          "deathtime": "2151-09-15T00:45:00Z",
          "admission_type": "EMERGENCY"
        },
        {
          "id": 93,
          "patient": {
            "id": 69,
            "subject_id": 42033,
            "gender": "F",
            "dob": "2045-10-07T00:00:00Z",
            "dod": "2131-07-28T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2131-07-28T00:00:00Z"
          },
          "hadm_id": 154156,
          "admittime": "2131-07-26T17:13:00Z",
          "dischtime": "2131-07-28T16:02:00Z",
          "deathtime": "2131-07-28T16:02:00Z",
          "admission_type": "EMERGENCY"
        },
        {
          "id": 94,
          "patient": {
            "id": 70,
            "subject_id": 42066,
            "gender": "M",
            "dob": "2061-06-13T00:00:00Z",
            "dod": "2112-02-11T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2112-02-11T00:00:00Z"
          },
          "hadm_id": 171628,
          "admittime": "2112-02-04T14:49:00Z",
          "dischtime": "2112-02-11T12:00:00Z",
          "deathtime": "2112-02-11T12:00:00Z",
          "admission_type": "EMERGENCY"
        },
        {
          "id": 95,
          "patient": {
            "id": 71,
            "subject_id": 42075,
            "gender": "M",
            "dob": "2086-02-04T00:00:00Z",
            "dod": "2166-02-26T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2166-02-26T00:00:00Z"
          },
          "hadm_id": 151323,
          "admittime": "2166-02-12T17:57:00Z",
          "dischtime": "2166-02-26T00:00:00Z",
          "deathtime": "2166-02-26T00:00:00Z",
          "admission_type": "EMERGENCY"
        },
        {
          "id": 96,
          "patient": {
            "id": 72,
            "subject_id": 42135,
            "gender": "M",
            "dob": "2083-09-20T00:00:00Z",
            "dod": "2127-10-28T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2127-10-28T00:00:00Z"
          },
          "hadm_id": 102203,
          "admittime": "2127-07-23T15:21:00Z",
          "dischtime": "2127-08-04T16:00:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 97,
          "patient": {
            "id": 72,
            "subject_id": 42135,
            "gender": "M",
            "dob": "2083-09-20T00:00:00Z",
            "dod": "2127-10-28T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2127-10-28T00:00:00Z"
          },
          "hadm_id": 117105,
          "admittime": "2127-10-06T21:00:00Z",
          "dischtime": "2127-10-28T12:50:00Z",
          "deathtime": "2127-10-28T12:50:00Z",
          "admission_type": "EMERGENCY"
        },
        {
          "id": 98,
          "patient": {
            "id": 73,
            "subject_id": 42199,
            "gender": "F",
            "dob": "2044-06-27T00:00:00Z",
            "dod": "2117-04-04T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2117-04-04T00:00:00Z"
          },
          "hadm_id": 178513,
          "admittime": "2117-03-21T12:55:00Z",
          "dischtime": "2117-03-31T12:10:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 99,
          "patient": {
            "id": 74,
            "subject_id": 42231,
            "gender": "F",
            "dob": "2016-12-05T00:00:00Z",
            "dod": "2105-05-18T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2105-05-18T00:00:00Z"
          },
          "hadm_id": 171878,
          "admittime": "2102-08-29T07:15:00Z",
          "dischtime": "2102-09-06T16:20:00Z",
          "deathtime": null,
          "admission_type": "ELECTIVE"
        },
        {
          "id": 100,
          "patient": {
            "id": 75,
            "subject_id": 42275,
            "gender": "M",
            "dob": "2058-08-04T00:00:00Z",
            "dod": "2136-03-26T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2136-03-26T00:00:00Z"
          },
          "hadm_id": 128293,
          "admittime": "2135-10-24T20:28:00Z",
          "dischtime": "2135-10-27T17:22:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 101,
          "patient": {
            "id": 76,
            "subject_id": 42281,
            "gender": "F",
            "dob": "2051-03-23T00:00:00Z",
            "dod": "2119-11-14T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2119-11-14T00:00:00Z"
          },
          "hadm_id": 195911,
          "admittime": "2119-10-17T05:58:00Z",
          "dischtime": "2119-11-14T09:30:00Z",
          "deathtime": "2119-11-14T09:30:00Z",
          "admission_type": "EMERGENCY"
        },
        {
          "id": 102,
          "patient": {
            "id": 77,
            "subject_id": 42292,
            "gender": "M",
            "dob": "2098-04-29T00:00:00Z",
            "dod": "2165-01-16T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": null
          },
          "hadm_id": 138503,
          "admittime": "2162-01-16T13:56:00Z",
          "dischtime": "2162-01-19T13:45:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 103,
          "patient": {
            "id": 78,
            "subject_id": 42302,
            "gender": "F",
            "dob": "2074-09-29T00:00:00Z",
            "dod": "2160-06-08T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": null
          },
          "hadm_id": 167754,
          "admittime": "2160-05-04T14:10:00Z",
          "dischtime": "2160-05-08T11:55:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 104,
          "patient": {
            "id": 79,
            "subject_id": 42321,
            "gender": "F",
            "dob": "2041-05-16T00:00:00Z",
            "dod": "2122-02-28T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2122-02-28T00:00:00Z"
          },
          "hadm_id": 114648,
          "admittime": "2121-12-07T20:49:00Z",
          "dischtime": "2121-12-12T16:40:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 105,
          "patient": {
            "id": 80,
            "subject_id": 42346,
            "gender": "F",
            "dob": "2072-12-03T00:00:00Z",
            "dod": "2160-12-27T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2160-12-27T00:00:00Z"
          },
          "hadm_id": 180391,
          "admittime": "2160-12-16T13:47:00Z",
          "dischtime": "2160-12-21T15:30:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 106,
          "patient": {
            "id": 80,
            "subject_id": 42346,
            "gender": "F",
            "dob": "2072-12-03T00:00:00Z",
            "dod": "2160-12-27T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2160-12-27T00:00:00Z"
          },
          "hadm_id": 175880,
          "admittime": "2160-12-26T11:45:00Z",
          "dischtime": "2160-12-27T07:45:00Z",
          "deathtime": "2160-12-27T07:45:00Z",
          "admission_type": "EMERGENCY"
        },
        {
          "id": 107,
          "patient": {
            "id": 81,
            "subject_id": 42367,
            "gender": "F",
            "dob": "2060-02-12T00:00:00Z",
            "dod": "2147-11-04T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2147-11-04T00:00:00Z"
          },
          "hadm_id": 139932,
          "admittime": "2147-10-03T16:10:00Z",
          "dischtime": "2147-11-04T19:30:00Z",
          "deathtime": "2147-11-04T19:30:00Z",
          "admission_type": "EMERGENCY"
        },
        {
          "id": 108,
          "patient": {
            "id": 82,
            "subject_id": 42412,
            "gender": "M",
            "dob": "2079-01-29T00:00:00Z",
            "dod": "2166-05-30T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2166-05-30T00:00:00Z"
          },
          "hadm_id": 114867,
          "admittime": "2165-12-19T12:19:00Z",
          "dischtime": "2165-12-25T14:20:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 109,
          "patient": {
            "id": 83,
            "subject_id": 42430,
            "gender": "M",
            "dob": "2061-12-10T00:00:00Z",
            "dod": "2142-11-30T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2142-11-30T00:00:00Z"
          },
          "hadm_id": 100969,
          "admittime": "2142-11-26T21:20:00Z",
          "dischtime": "2142-11-30T10:55:00Z",
          "deathtime": "2142-11-30T10:55:00Z",
          "admission_type": "EMERGENCY"
        },
        {
          "id": 110,
          "patient": {
            "id": 84,
            "subject_id": 42458,
            "gender": "M",
            "dob": "1846-07-21T00:00:00Z",
            "dod": "2147-09-08T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2147-09-08T00:00:00Z"
          },
          "hadm_id": 159647,
          "admittime": "2146-07-21T14:45:00Z",
          "dischtime": "2146-07-22T14:45:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 111,
          "patient": {
            "id": 85,
            "subject_id": 43735,
            "gender": "M",
            "dob": "2046-07-05T00:00:00Z",
            "dod": "2128-11-09T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2128-11-09T00:00:00Z"
          },
          "hadm_id": 112662,
          "admittime": "2128-11-04T16:05:00Z",
          "dischtime": "2128-11-09T12:00:00Z",
          "deathtime": "2128-11-09T12:00:00Z",
          "admission_type": "EMERGENCY"
        },
        {
          "id": 112,
          "patient": {
            "id": 86,
            "subject_id": 43746,
            "gender": "F",
            "dob": "2029-12-07T00:00:00Z",
            "dod": "2111-01-14T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2111-01-14T00:00:00Z"
          },
          "hadm_id": 167181,
          "admittime": "2110-12-29T18:03:00Z",
          "dischtime": "2111-01-14T15:19:00Z",
          "deathtime": "2111-01-14T15:19:00Z",
          "admission_type": "EMERGENCY"
        },
        {
          "id": 113,
          "patient": {
            "id": 87,
            "subject_id": 43748,
            "gender": "M",
            "dob": "2099-09-02T00:00:00Z",
            "dod": "2181-02-27T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2181-02-27T00:00:00Z"
          },
          "hadm_id": 121860,
          "admittime": "2179-04-17T13:12:00Z",
          "dischtime": "2179-04-23T12:55:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 114,
          "patient": {
            "id": 88,
            "subject_id": 43779,
            "gender": "M",
            "dob": "2097-01-07T00:00:00Z",
            "dod": "2173-12-24T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": null
          },
          "hadm_id": 186071,
          "admittime": "2173-11-27T21:56:00Z",
          "dischtime": "2173-11-30T15:50:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 115,
          "patient": {
            "id": 89,
            "subject_id": 43798,
            "gender": "M",
            "dob": "2136-07-29T00:00:00Z",
            "dod": "2200-12-31T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2200-12-31T00:00:00Z"
          },
          "hadm_id": 130870,
          "admittime": "2198-06-29T07:15:00Z",
          "dischtime": "2198-08-07T23:59:00Z",
          "deathtime": null,
          "admission_type": "ELECTIVE"
        },
        {
          "id": 116,
          "patient": {
            "id": 90,
            "subject_id": 43827,
            "gender": "F",
            "dob": "1876-07-14T00:00:00Z",
            "dod": "2178-12-07T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2178-12-07T00:00:00Z"
          },
          "hadm_id": 149950,
          "admittime": "2176-07-14T13:24:00Z",
          "dischtime": "2176-07-18T15:00:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 117,
          "patient": {
            "id": 91,
            "subject_id": 43870,
            "gender": "F",
            "dob": "2097-05-16T00:00:00Z",
            "dod": "2186-02-12T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2186-02-12T00:00:00Z"
          },
          "hadm_id": 142633,
          "admittime": "2186-02-09T21:32:00Z",
          "dischtime": "2186-02-12T00:07:00Z",
          "deathtime": "2186-02-12T00:07:00Z",
          "admission_type": "EMERGENCY"
        },
        {
          "id": 118,
          "patient": {
            "id": 92,
            "subject_id": 43879,
            "gender": "F",
            "dob": "2051-07-25T00:00:00Z",
            "dod": "2107-07-13T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2107-07-13T00:00:00Z"
          },
          "hadm_id": 158100,
          "admittime": "2106-08-30T15:43:00Z",
          "dischtime": "2106-08-31T15:15:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 119,
          "patient": {
            "id": 93,
            "subject_id": 43881,
            "gender": "M",
            "dob": "2051-03-24T00:00:00Z",
            "dod": "2105-02-16T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2105-02-16T00:00:00Z"
          },
          "hadm_id": 172454,
          "admittime": "2104-09-24T17:31:00Z",
          "dischtime": "2104-09-30T16:17:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 120,
          "patient": {
            "id": 93,
            "subject_id": 43881,
            "gender": "M",
            "dob": "2051-03-24T00:00:00Z",
            "dod": "2105-02-16T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2105-02-16T00:00:00Z"
          },
          "hadm_id": 167021,
          "admittime": "2104-10-24T09:44:00Z",
          "dischtime": "2104-11-01T11:59:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 121,
          "patient": {
            "id": 94,
            "subject_id": 43909,
            "gender": "F",
            "dob": "2073-11-22T00:00:00Z",
            "dod": "2152-10-09T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2152-10-09T00:00:00Z"
          },
          "hadm_id": 167612,
          "admittime": "2152-10-09T19:05:00Z",
          "dischtime": "2152-10-09T22:33:00Z",
          "deathtime": "2152-10-09T22:33:00Z",
          "admission_type": "EMERGENCY"
        },
        {
          "id": 122,
          "patient": {
            "id": 95,
            "subject_id": 43927,
            "gender": "F",
            "dob": "2104-02-12T00:00:00Z",
            "dod": "2176-09-09T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2176-09-09T00:00:00Z"
          },
          "hadm_id": 110958,
          "admittime": "2175-10-02T12:30:00Z",
          "dischtime": "2175-10-06T15:00:00Z",
          "deathtime": null,
          "admission_type": "ELECTIVE"
        },
        {
          "id": 123,
          "patient": {
            "id": 96,
            "subject_id": 44083,
            "gender": "M",
            "dob": "2057-11-15T00:00:00Z",
            "dod": "2114-02-20T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2114-02-20T00:00:00Z"
          },
          "hadm_id": 125157,
          "admittime": "2112-05-04T08:00:00Z",
          "dischtime": "2112-05-11T14:15:00Z",
          "deathtime": null,
          "admission_type": "ELECTIVE"
        },
        {
          "id": 124,
          "patient": {
            "id": 96,
            "subject_id": 44083,
            "gender": "M",
            "dob": "2057-11-15T00:00:00Z",
            "dod": "2114-02-20T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2114-02-20T00:00:00Z"
          },
          "hadm_id": 131048,
          "admittime": "2112-05-22T15:37:00Z",
          "dischtime": "2112-05-25T13:30:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 125,
          "patient": {
            "id": 96,
            "subject_id": 44083,
            "gender": "M",
            "dob": "2057-11-15T00:00:00Z",
            "dod": "2114-02-20T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2114-02-20T00:00:00Z"
          },
          "hadm_id": 198330,
          "admittime": "2112-05-28T15:45:00Z",
          "dischtime": "2112-06-07T16:50:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 126,
          "patient": {
            "id": 97,
            "subject_id": 44154,
            "gender": "M",
            "dob": "1878-05-14T00:00:00Z",
            "dod": "2178-05-15T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2178-05-15T00:00:00Z"
          },
          "hadm_id": 174245,
          "admittime": "2178-05-14T20:29:00Z",
          "dischtime": "2178-05-15T09:45:00Z",
          "deathtime": "2178-05-15T09:45:00Z",
          "admission_type": "EMERGENCY"
        },
        {
          "id": 127,
          "patient": {
            "id": 98,
            "subject_id": 44212,
            "gender": "F",
            "dob": "2078-06-16T00:00:00Z",
            "dod": "2124-01-29T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": null
          },
          "hadm_id": 163189,
          "admittime": "2123-11-24T14:14:00Z",
          "dischtime": "2123-12-30T14:31:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 128,
          "patient": {
            "id": 99,
            "subject_id": 44222,
            "gender": "M",
            "dob": "2107-06-27T00:00:00Z",
            "dod": "2182-08-03T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2182-08-03T00:00:00Z"
          },
          "hadm_id": 192189,
          "admittime": "2180-07-19T06:55:00Z",
          "dischtime": "2180-07-20T13:00:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        },
        {
          "id": 129,
          "patient": {
            "id": 100,
            "subject_id": 44228,
            "gender": "F",
            "dob": "2112-10-22T00:00:00Z",
            "dod": "2171-04-14T00:00:00Z",
            "expire_flag": 1,
            "dod_hosp": "2171-04-14T00:00:00Z"
          },
          "hadm_id": 103379,
          "admittime": "2170-12-15T03:14:00Z",
          "dischtime": "2170-12-24T18:00:00Z",
          "deathtime": null,
          "admission_type": "EMERGENCY"
        }
      ]
      setData(responseJson);
   },[getAccessTokenSilently]);
var records=[];
var discharges=discharges_data.results;
if(discharges) {
    var discharges_arr=discharges;
    for(var i=0;i<discharges_arr.length;i++)
    {
        var link_btn='';
        if(discharges_arr[i].coder_sessions.length>0){
            var url="/discharge-summary/"+discharges_arr[i].coder_sessions[0].id+'/'+discharges_arr[i].id;
            link_btn='';
        }
        var rec={
            id: discharges_arr[i].hadm_id,
            age: new Date(discharges_arr[i].dischtime).toLocaleDateString(),  
            name: discharges_arr[i].patient.subject_id,
            company: discharges_arr[i].admission_type,
            phone: new Date(discharges_arr[i].admittime).toLocaleDateString(),
            status: 'In-Progress',
            action:link_btn
        }
        records.push(rec);
    }
}

const defaultSorted = [
    {
        dataField: 'id',
        order: 'asc',
    },
]; 
    return (
    <div className="wrapper"> 
    
    <div className="content-page">
        <div className="content page_container">
            <div className="container-fluid content_box">
            <div className="row" >
                <div className="col-12">
                    <div className="page-title-box">
                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                <li className="breadcrumb-item"></li>
                                <li className="breadcrumb-item active">Discharges</li>
                            </ol>
                        </div>
                        <h4 className="page-title">Discharges</h4>
                    </div>
                </div>
            </div>

                <Row>
                    <Col lg={12}>
                        <Card>
                            <CardBody>
                                <ToolkitProvider
                                    bootstrap4
                                    keyField="id"
                                    data={records}
                                    columns={columns}
                                    search
                                    exportCSV={{ onlyExportFiltered: true, exportAll: false }}>
                                    {props => (
                                        <React.Fragment>
                                            <Row>
                                                <Col>
                                                    <SearchBar {...props.searchProps} />
                                                </Col>
                                                <Col className="text-right">
                                                    <ExportCSVButton {...props.csvProps} className="btn custom_btn">
                                                        Export CSV
                                                    </ExportCSVButton>
                                                </Col>
                                            </Row>
                                            <BootstrapTable
                                                {...props.baseProps}
                                                bordered={false}
                                                defaultSorted={defaultSorted}
                                                pagination={paginationFactory({ sizePerPage: 10 })}
                                                wrapperClasses="table-responsive"
                                            />
                                        </React.Fragment>
                                    )}
                                </ToolkitProvider>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    </div>


</div>
    );
};
describe("Discharges component", () => {
  test("Matches the snapshot", () => {
    const discharges = create(<Discharges />);
    expect(discharges.toJSON()).toMatchSnapshot();
  });
});