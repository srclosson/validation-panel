import React, { useEffect, useCallback } from 'react';
import { PanelProps } from '@grafana/data';
import { VerificationType, TestCases } from 'types';
import { css, cx } from 'emotion';
import { stylesFactory } from '@grafana/ui';
import { assert } from 'chai';

interface Props extends PanelProps<VerificationType> {}

export const Panel: React.FC<Props> = ({ options, data, width, height, onOptionsChange }) => {

  const resolve = (path: string, obj: any) => {
    return path.split('.').reduce((prev: any, curr: string) => {
        console.log("prev", prev);
        return prev ? prev[curr] : null
    }, obj || self)
  }
  console.log("assert", assert);
  const runTests = (tests: TestCases) => {
    Object.entries(tests).forEach(([name, assertions]) => {
      Object.entries(assertions).forEach(([definition, declarations]) => {
        const assertion = definition.split('(')[0];
        const arglist = definition.split("(")[1].replace(/\)$/,"").split(",")
        console.log("assertion, args", assertion, arglist, declarations["value"], resolve(declarations['value'], data));
      });
    })
    // describe(description,function(){
    //     {
    //         describe("the "+signature+" method",function(){
    //             var methodname = signature.split("(")[0],
    //                 arglist = signature.split("(")[1].replace(/\)$/,"").split(",");
    //             _.each(tests,function(test,testdesc){
    //                 var givenargs = _.reduce(_.keys(test),function(mem,arg){
    //                     mem["@"+arg] = test[arg];
    //                     return mem;
    //                 },{});
    //                 describe(testdesc,function(){
    //                     var result, method;
    //                     beforeEach(function(){
    //                         method = lib[methodname];
    //                         _.each(test.context||{},function(stubdef,stubname){
    //                             sinon.stub(lib,stubname,stubdef.method || (function(){
    //                                 var callcount = 0;
    //                                 return function(){
    //                                     var ret = stubdef.returnseries ? stubdef.returnseries[callcount]
    //                                         : stubdef.returnsarg !== undefined ? arguments[stubdef.returnsarg]
    //                                         : test[stubdef.returns]||stubdef.returns;
    //                                     callcount++;
    //                                     return I ? I.fromJS(ret) : ret;
    //                                 };
    //                             })());
    //                         });
    //                         result = method.apply(lib,arglist.map(function(param){
    //                             return I ? I.fromJS(test[param]) : test[param];
    //                         }));
    //                     });
    //                     it(test.description || "it returns the expected value",function(){
    //                         expect(result && result.toJS ? result.toJS() : result).toEqual(test.expected);
    //                     });
    //                     _.each(test.context||{},function(stubdef,stubname){
    //                         if (stubdef.expectedargs){
    //                             describe("the usage of "+stubname,function(){
    //                                 var len = stubdef.expectedargs.length;
    //                                 it("called "+stubname+" "+len+" time"+(len>1?'s':''),function(){
    //                                     expect(lib[stubname].callCount).toEqual(len);
    //                                 });
    //                                 _.each(stubdef.expectedargs,function(args,n){
    //                                     describe("call #"+n,function(){
    //                                         it("passed "+args.length+" argument"+(args.length>1?'s':''),function(){
    //                                             expect((lib[stubname].getCall(n)||{args:[]}).args.length).toEqual(args.length);
    //                                         });
    //                                         _.each(args,function(arg,a){
    //                                             it("used correct value for parameter #"+a,function(){
    //                                                 var usedargs = (lib[stubname].getCall(n)||{args:[]}).args;
    //                                                 expect((I?I.List(usedargs).toJS():usedargs)[a]).toEqual(givenargs[arg]||arg);
    //                                             });
    //                                         });
    //                                     });
    //                                 });
    //                             });
    //                         }
    //                     });
    //                     afterEach(function(){
    //                         _.each(test.context||{},function(stubdef,stubname){
    //                             lib[stubname].restore();
    //                         });
    //                     });
    //                 });
    //             });
    //         });
    //     });
    // });
  }
  //const theme = useTheme();
  

  const onInit = useCallback((options, data) => {
    onOptionsChange({
      ...options,
      editor: {
        ...options.editor,
        data,
      }
    });

    const tests: TestCases = JSON.parse(options.editor.tests);
    runTests(tests);
  }, []);


  useEffect(() => {
    onInit(options, data);
    return () => {
    };
  });

  const styles = getStyles();
  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    />
  );
};

const getStyles = stylesFactory(() => {
  return {
    wrapper: css`
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
  };
});
