import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

interface Props {
    rows: any[];
    columns: any[];
}

const ResponsiveDataGrid: React.FC<Props> = ({ rows, columns }) => {
    const isSmallScreen = window.innerWidth <= 600;
    const defaultPageSize = isSmallScreen ? 5 : 10;

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pagination
                pageSize={defaultPageSize}
                rowsPerPageOptions={[defaultPageSize, defaultPageSize * 2, defaultPageSize * 3]}
            />
        </div>
    );
};

export default ResponsiveDataGrid;
