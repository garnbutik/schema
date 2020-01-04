// import React, {useContext} from 'react';
// import ScheduleContext from '../context/schedule/scheduleContext';
//
// const LessonTableRow = (props) => {
//     const scheduleContext = useContext(ScheduleContext);
//     const lesson = props;
//     return (
//         <table>
//             <tbody>
//             <tr>
//                 <th>ID</th>
//                 <th>Datum</th>
//                 <th>Tid</th>
//                 <th>Sal</th>
//                 <th>Lärare</th>
//                 <th>Aktivitet</th>
//                 <th>Övrig info</th>
//             </tr>
//             {lessons.map(lesson => (
//                 <tr>
//                     <td>{lesson.id}</td>
//                     <td>{lesson.startdate}</td>
//                     <td>{lesson.starttime}</td>
//                     <td>{lesson.endtime}</td>
//                     <td>{lesson.location}</td>
//                     <td>{lesson.teacher}</td>
//                     <td>{lesson.activity}</td>
//                     <td>{lesson.city}</td>
//                     <td>{lesson.additionalProps}</td>
//                 </tr>
//             ))}
//             </tbody>
//         </table>
//     );
// };
//
// export default LessonTableRow;