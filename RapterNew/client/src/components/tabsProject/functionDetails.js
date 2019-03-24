import React, { Component, Fragment } from "react";
import { Row, Col, Button } from 'react-materialize';
import objectUtil from '../../utils/objectUtil';
const localConstant = objectUtil.getlocalizeData();

export const Functions = (props) => {
    return (
        <Row className="m-0 mt-3 pl-1">
            <label className="ml-1" s={6}>{localConstant.functions.RAPTER_FUNCTIONALITY}</label>
            {props.functionsList && props.functionsList.map(data => {
                return (
                    <div className="switch mb-1">
                        <Col s={6} >{data.name}</Col>
                        <label> Off <input type="checkbox" name={data.path} onChange={props.inputHandlerChange}
                            defaultChecked={props.checkedFunctionValues && (props.checkedFunctionValues[data.path]) ? true : false}
                            disabled={props.ApplicationMode == "VIEW" ? true : false}
                        /> <span class="lever" /> On </label>
                    </div>
                )
            })}
            {props.ApplicationMode == "VIEW" ? null :
                <Button className="right mb-2 mr-2 btn_secondary" onClick={props.functionsChangeHandler}>{localConstant.commonConstants.OK}</Button>}
        </Row>
    );
}