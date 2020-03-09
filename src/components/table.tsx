import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';

export interface TableKey<T> {
  title?: string;
  name: string | keyof T;
  map?: (a: T) => any;
  onClick?: (a: T) => any;
}

export interface TableConfig<T> {
  /**
   * configuration keys for headers
   */
  headers: TableKey<T>[];
  /**
   * data displayed
   */
  data: T[];
}

const DynamicTable = ({ headers, data }: TableConfig<any>) => (
  <>
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map(({ name, title }, i) => (
              <TableCell key={i}>{title ?? name} </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {headers.map((h, i) => (
                <TableCell key={index + '_' + i} component="th" scope="row">
                  {row[h.name]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>
);

export default DynamicTable;
