import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import CreateSocket from "../../components/socket/CreateSocket";
import SocketTable from "../../components/socket/SocketTable";
import CreateChipset from "../../components/chipset/CreateChipset";
import ChipsetTable from "../../components/chipset/ChipsetTable";
import CreateBrand from "../../components/brand/CreateBrand";
import BrandTable from "../../components/brand/BrandTable";
import CrateLightTable from "../../components/light-type/CrateLightTable";
import LightTypeTable from "../../components/light-type/LightTypeTable";

import styles from './/Page.module.css';

export const AdminSubDashboard: React.FC = () => {
    return (
        <div>
            <Tabs>
                <TabList className={styles.tabList}>
                    <Tab className={styles.tab}>Бренд</Tab>
                    <Tab className={styles.tab}>Тип подсветки</Tab>
                    <Tab className={styles.tab}>Сокет</Tab>
                    <Tab className={styles.tab}>Чипсет</Tab>
                </TabList>

                <TabPanel className={styles.tabPanel}>
                    <CreateBrand />
                    <BrandTable />
                </TabPanel>
                <TabPanel className={styles.tabPanel}>
                    <CrateLightTable />
                    <LightTypeTable />
                </TabPanel>
                <TabPanel className={styles.tabPanel}>
                    <CreateSocket />
                    <SocketTable />
                </TabPanel>
                <TabPanel className={styles.tabPanel}>
                    <CreateChipset />
                    <ChipsetTable />
                </TabPanel>
            </Tabs>
        </div>
    );
};
