import { useEffect, useState } from 'react'
import { ENNaming } from '../constants/naming';
import { MultiTheme } from '../constants/interface';
import { storageService } from '../services/storage.service';
import { USERCONFIGSETTING } from '../constants/ActionTypes';

export default function OutputFile() {
    const [exportConfig, setExportConfig] = useState({
        direction: 'rtl',
        orientation: 'landscape',
        defaultColWidth: ENNaming.thirteen,
        showHead: 'everyPage',
        canShowCurrentTable: false,
        shouldFilteredValue: false,
        shouldFreezeHeader: false,
        tableWidthType: 13

    });
    const directionOptions: MultiTheme[] = [
        { name: 'راست به چپ', value: 'right', previewClass: 'bg-lightgray border border-lightgray-2' },
        { name: 'چپ به راست', value: 'left', previewClass: 'bg-lightgray border border-lightgray-2' },
    ];

    const orientationOptions: MultiTheme[] = [
        { name: 'عمودی', value: 'portrait', previewClass: 'bg-lightgray border border-lightgray-2' },
        { name: 'افقی', value: 'landscape', previewClass: 'bg-lightgray border border-lightgray-2' },
    ];

    const showHeadOptions: MultiTheme[] = [
        { name: 'تمام صفحات', value: 'everyPage', previewClass: 'bg-lightgray border border-lightgray-2' },
        { name: 'فقط صفحه اول', value: 'firstPage', previewClass: 'bg-lightgray border border-lightgray-2' },
    ];
    useEffect(() => {
        const savedConfig: any = storageService.getItem(USERCONFIGSETTING);
        if (savedConfig) {
            setExportConfig(savedConfig);
        }
        else {
            setExportConfig(exportConfig);
            storageService.setItem(USERCONFIGSETTING, exportConfig);
        }
    }, []);
    const handleExportConfigChange = (key: string, value: string | number) => {
        const newConfig = { ...exportConfig, [key]: value };
        setExportConfig(newConfig);
        storageService.setItem(USERCONFIGSETTING, newConfig);
    };

    return (
        <></>
        // <div className="p-4 space-y-6">
        //     <div className="grid gap-4">
        //         <div className='grid justify-start'>
        //             <h1 className="text-xl mb-4">جهت متن:</h1>
        //             <div className="flex gap-8">
        //                 {directionOptions.map((item) => (
        //                     <div
        //                         key={item.value}
        //                         className={`p-4 rounded-lg cursor-pointer text-gray border-2 transition-all 
        //                     ${exportConfig.direction === item.value
        //                                 ? 'border-primary-500 shadow-lg'
        //                                 : 'shadow-sm border-transparent hover:outline-gray'
        //                             }`}
        //                         onClick={() => handleExportConfigChange('direction', item.value)}>
        //                         <div className="text-center font-medium">{item.name}</div>
        //                     </div>
        //                 ))}
        //             </div>
        //         </div>

        //         <hr className='text-1'></hr>
        //         <div className='grid justify-start'>
        //             <h1 className="text-xl mb-4">جهت صفحه:</h1>
        //             <div className="flex gap-8">
        //                 {orientationOptions.map((item) => (
        //                     <div
        //                         key={item.value}
        //                         className={`p-4 rounded-lg cursor-pointer text-gray border-2 transition-all 
        //                     ${exportConfig.orientation === item.value
        //                                 ? 'border-primary-500 shadow-lg'
        //                                 : 'shadow-sm border-transparent hover:outline-gray'
        //                             }`}
        //                         onClick={() => handleExportConfigChange('orientation', item.value)}>
        //                         <div className="text-center font-medium">{item.name}</div>
        //                     </div>
        //                 ))}
        //             </div>
        //         </div>

        //         <hr className='text-1'></hr>
        //         <div className='grid justify-start'>
        //             <h1 className="text-xl mb-4">عرض پیشفرض ستونها (پیکسل):</h1>
        //             <div className="flex items-center gap-4">
        //                 <input
        //                     type="range"
        //                     min="10"
        //                     max="28"
        //                     value={exportConfig.defaultColWidth}
        //                     onChange={(e) => handleExportConfigChange('defaultColWidth', parseInt(e.target.value))}
        //                     className="w-64"
        //                 />
        //                 <span className="text-lg font-medium">{exportConfig.defaultColWidth}</span>
        //             </div>
        //         </div>

        //         <hr className='text-1'></hr>
        //         <div className='grid justify-start'>
        //             <h1 className="text-xl mb-4">نمایش سربرگ:</h1>
        //             <div className="flex gap-8">
        //                 {showHeadOptions.map((item) => (
        //                     <div
        //                         key={item.value}
        //                         className={`p-4 rounded-lg cursor-pointer text-gray border-2 transition-all 
        //                     ${exportConfig.showHead === item.value
        //                                 ? 'border-primary-500 shadow-lg'
        //                                 : 'shadow-sm border-transparent hover:outline-gray'
        //                             }`}
        //                         onClick={() => handleExportConfigChange('showHead', item.value)}>
        //                         <div className="text-center font-medium">{item.name}</div>
        //                     </div>
        //                 ))}
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
};
