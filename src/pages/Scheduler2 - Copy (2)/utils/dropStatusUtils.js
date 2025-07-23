
import moment from 'moment';
import 'moment-timezone';

// Complete status mapping function based on the original displayDropStatus logic
export const getDropStatus = (drop, t) => {
  const { dlvystatus, type, reschFlg } = drop;
  const isRescheduled = reschFlg == 2;
  
  // Based on original displayDropStatus function logic
  if (type === 'open' && (dlvystatus === '0' || dlvystatus === '8')) {
    return { 
      label: t ? t('ToPlan') : 'To Plan', 
      color: '#ff9800', 
      bgColor: '#fff3e0',
      className: 'badge-warning',
      isRescheduled
    };
  }
  
  if (type === 'open' && dlvystatus === '1') {
    return { 
      label: t ? t('Planned') : 'Planned', 
      color: '#4caf50', 
      bgColor: '#e8f5e8',
      className: 'badge-success',
      isRescheduled
    };
  }
  
  if (type === 'Allocated' && (dlvystatus === '0' || dlvystatus === '8')) {
    return { 
      label: t ? t('Planned') : 'Planned', 
      color: '#4caf50', 
      bgColor: '#e8f5e8',
      className: 'badge-success',
      isRescheduled
    };
  }
  
  if (type === 'selected' && (dlvystatus === '0' || dlvystatus === '8')) {
    return { 
      label: t ? t('Planned') : 'Planned', 
      color: '#4caf50', 
      bgColor: '#e8f5e8',
      className: 'badge-success',
      isRescheduled
    };
  }
  
  // Status based on dlvystatus
  switch (dlvystatus) {
    case '1':
      return { 
        label: t ? t('Planned') : 'Planned', 
        color: '#4caf50', 
        bgColor: '#e8f5e8',
        className: 'badge-success',
        isRescheduled
      };
    case '2':
      return { 
        label: t ? t('OntheWay') : 'On the Way', 
        color: '#2196f3', 
        bgColor: '#e3f2fd',
        className: 'badge-primary',
        isRescheduled
      };
    case '3':
      return { 
        label: t ? t('InProgress') : 'In Progress', 
        color: '#ff9800', 
        bgColor: '#fff3e0',
        className: 'badge-warning',
        isRescheduled
      };
    case '4':
      return { 
        label: t ? t('Completed') : 'Completed', 
        color: '#f44336', 
        bgColor: '#ffebee',
        className: 'badge-danger',
        isRescheduled
      };
    case '5':
      return { 
        label: t ? t('Skipped') : 'Skipped', 
        color: '#f44336', 
        bgColor: '#ffebee',
        className: 'badge-danger',
        isRescheduled
      };
    case '6':
      return { 
        label: t ? t('Rescheduled') : 'Rescheduled', 
        color: '#424242', 
        bgColor: '#f5f5f5',
        className: 'badge-dark',
        isRescheduled: false // Don't show rescheduled indicator for status 6
      };
    case '7':
      return { 
        label: t ? t('Canceled') : 'Canceled', 
        color: '#f44336', 
        bgColor: '#ffebee',
        className: 'badge-danger',
        isRescheduled
      };
    default:
      return { 
        label: 'Unknown', 
        color: '#757575', 
        bgColor: '#f5f5f5',
        className: 'badge-secondary',
        isRescheduled
      };
  }
};

// Priority color mapping
export const getPriorityStyle = (priorityOrder) => {
  switch (priorityOrder) {
    case '1':
      return { label: 'Normal', color: '#2196f3', bgColor: '#e3f2fd', className: 'badge-primary' };
    case '2':
      return { label: 'Urgent', color: '#4caf50', bgColor: '#e8f5e8', className: 'badge-success' };
    case '3':
      return { label: 'Critical', color: '#f44336', bgColor: '#ffebee', className: 'badge-danger' };
    default:
      return { label: 'Normal', color: '#2196f3', bgColor: '#e3f2fd', className: 'badge-primary' };
  }
};

// DocType color mapping function
export const getDocTypeStyle = (doctyp) => {
  switch (doctyp) {
    case 'PICK':
      return { color: '#2196f3', bgColor: '#e3f2fd' };
    case 'DLV':
      return { color: '#4caf50', bgColor: '#e8f5e8' };
    case 'PRECEIPT':
      return { color: '#f44336', bgColor: '#ffebee' };
    default:
      return { color: '#607d8b', bgColor: '#eceff1' };
  }
};

// Get row background color based on document date
export const getRowBackgroundColor = (doc) => {
  const today = new Date();
  const createdDate = new Date(doc.docdate);

  // Check if the document date is in the future
  if (createdDate > today) {
    return "#D3D3D3";
  }

  const differenceInDays = Math.floor(
    (today - createdDate) / (1000 * 3600 * 24)
  );

  if (doc.doctype === "PICK") {
    return differenceInDays === 0
      ? "#90EE90" // Green
      : differenceInDays <= 3
      ? "#FCE77D" // Light Orange
      : "#EEA47F"; // Light Red
  } else {
    // For other documents, show light blue
    return "#ADD8E6";
  }
};

// Extract color from style string
export const extractBackgroundColor = (colorStyle) => {
  if (!colorStyle) return '';
  const match = colorStyle.match("background-color:(.*)");
  return match ? match[1] : '';
};
