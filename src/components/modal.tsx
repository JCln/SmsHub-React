import React from 'react';
import ImageWrapper from './image';
import { ENNaming } from '../constants/naming';
import sessionExpired from '../images/session-expired.jpg';

type SessionExpiredModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onRefresh: () => void;
    icon?: string;
    title?: string | ENNaming;
    message?: string | ENNaming;
    refreshButtonText?: string;
};

export const SessionExpiredModal: React.FC<SessionExpiredModalProps> = ({
    isOpen,
    onClose,
    onRefresh,
    title = "",
    icon,
    message = "",
    refreshButtonText = "بازگشت"
}) => {
    if (!isOpen) return null;

    return (
        <>
            <header className="bg-white shadow-md w-full flex items-center gap-2.5 px-1 py-1 transition-all duration-300 select-none">
                <div className='select-none'>
                    <div className="flex items-center">
                        <img className="" style={{ height: '20rem', width: '20rem' }} src={sessionExpired} alt="" />
                        <div className="text-center md:text-right">
                            <div className="text-[var(--color-4)] text-lg font-bold flex items-center gap-0.5">
                                <div>
                                    {window['ENV'].provinceUnicode || ''}
                                </div>
                            </div>
                            <div className="text-xs text-gray">{window['ENV'].systemDescriptionUnicode}</div>
                        </div>
                    </div>
                </div>
            </header>
            <div className=" fixed inset-0 z-50 overflow-y-auto  pt-10">
                <div className="flex items-center justify-center min-h-screen px-4 pb-20 text-center sm:block sm:p-0">
                    {/* Background overlay */}
                    <div
                        className="fixed inset-0 transition-opacity"
                        aria-hidden="true"
                        onClick={onClose}
                    >
                        <div className="absolute inset-0 bg-gray opacity-75"></div>
                    </div>

                    {/* Modal container */}
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className='w-xs h-xs text-center m-auto'>
                                {/*  */}
                            </div>
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <h3 className="text-lg leading-6 font-medium text-gray text-center">
                                        {title}
                                    </h3>
                                    <div className="mt-4">
                                        <p className="text-sm text-lightgray text-center">
                                            {message}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse justify-center">
                            <button
                                type="button"
                                className="w-full inline-flex justify-center rounded-xl border border-transparent shadow-sm px-8 py-3 m-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 ocus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm cursor-pointer"
                                onClick={onRefresh}
                            >
                                {refreshButtonText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};