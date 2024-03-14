export type Status = 
"notApprove" // 예매 확정 전
| "before" // 예매확정 + 공연 전
| "complete" // 공연 끝
| "canceled" // admin에 의해 공연 취소됨.