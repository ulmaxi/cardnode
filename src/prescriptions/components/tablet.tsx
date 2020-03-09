import { ConsultatedDrug } from '@ulmax/frontend';
import React from 'react';
import DynamicTable, { TableKey } from 'src/components/table';
import './styles.scss';

const headers: TableKey<ConsultatedDrug>[] = [
  {
    name: 'name',
  },
  { name: 'dosage' },
  { name: 'time', title: 'Interval' },
];

const Tablet = ({ prescriptions, hopsital, owner }: ConsultatedDrug) => (
  <>
    <div className="tablet-container">
      <div className="tablet-header">
        <span> {owner} </span>
        <span> {hopsital} </span>
      </div>
      <div className="tablet-body">
        <DynamicTable headers={headers} data={prescriptions} />
      </div>
    </div>
  </>
);

export default Tablet;
