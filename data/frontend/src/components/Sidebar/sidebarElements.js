export const Elements = {
    textField: 'textField',
    textArea: 'textArea',
    select: 'select'
}


export const SidebarElements = [
    {type: Elements.textField, label:'Text Field', img:'text-field.svg'},
    {type: Elements.textArea, label:'Text Area', img:'text-area.svg'},
    {type: Elements.select, label:'Select', img:'select.svg'},
];

export const getElementProps = (elementType)=>{
    switch(elementType){
        case Elements.textField:
            return {
                placeholder:'Text Field',
                defaultValue: '',
                maxLength: '128',
            };
        case Elements.textArea:
            return {
                placeholder:'Text Area ...',
                defaultValue: '',
                maxLength: '512',
                rows: '10'
            };
        case Elements.select:
            return {
                options: [
                    {nameOption: 'no selected', value: ''},
                    {nameOption: 'Name option-1', value: 'value-1'},
                    {nameOption: 'Name option-2', value: 'value-2'}
                ]
            };
        default:
            return {};
    }
    
}