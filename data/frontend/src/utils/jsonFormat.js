export function JSONFormat(obj){
    const o = {...obj};
    let jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*|\[\])?([,[{])?$/mg;
      let replacer = function(match, pIndent, pKey, pVal, pEnd) {
          let key = '<span class="json-key" style="color: #00bbff; white-space: break-spaces">',
              val = '<span class="json-value" style="color: #ff5e00; white-space: break-spaces">',
              str = '<span class="json-string" style="color: #ff9500; white-space: break-spaces">',
              r = pIndent || '';
          if (pKey)
              r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';
          if (pVal)
              r = r + (pVal[0] === '"' ? str : val) + pVal + '</span>';
          return r + (pEnd || '');
      };
  
      return JSON.stringify(o,null, 4)
                 .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
                 .replace(/</g, '&lt;').replace(/>/g, '&gt;')
                 .replace(jsonLine, replacer);
    
  }