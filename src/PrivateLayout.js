import React, {useEffect, useState} from 'react';
import SideMenu from './components/SideMenu';
import Menu from './components/Menu';
import { isMobile } from 'react-device-detect';


function PrivateLayout({ children }) {
    const [isOpen, setOpen] = useState(!isMobile);
    const [isMobileSize, setMobileSize] = useState(isMobile);

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    useEffect(() => {
        manipulateView();

        function manipulateView() {
            if (window.innerWidth <= 1024 && !isMobileSize) {
                setMobileSize(true);
                setOpen(false);
            } else if (window.innerWidth > 1024 && isMobileSize) {
                setMobileSize(false);
                setOpen(true);
            }
        }

        window.addEventListener('resize', () => {
            manipulateView();
        })
    }, [isMobileSize])

    return (
        <menu>
            <Menu isOpen={isOpen} setOpen={setOpen} isMobile={isMobileSize}/>
            <aside className={'middle-section'}>
                <SideMenu isOpen={isOpen} setOpen={setOpen} isMobile={isMobileSize}/>
                <section className={'content'}>
                    { children }
                </section>
            </aside>
        </menu>
    );
}

export default PrivateLayout;